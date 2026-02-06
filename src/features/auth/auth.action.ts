'use server';

import { cookies } from 'next/headers';
import { createServerApi } from '@/src/lib/api/server';
import { LoginFormValues } from '../login/components/LoginForm';
import { SignUpFormValues } from '../signup/components/SignUpForm';
import { ProfileSettingFormValues } from '../profile/components/ProfileSettingForm';
import { createMyPageApi } from '../mypage/mypage.api';
import { createAuthApi } from './auth.api';
import { PostLoginResponse } from './auth.schema';

export async function checkIsLoggedIn() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return !!accessToken;
}

type ActionResult<T = object> =
  | ({ success: true; message: string } & T)
  | { success: false; message: string };

export async function loginAction(
  data: LoginFormValues
): Promise<ActionResult<Pick<PostLoginResponse, 'isDuplicateLogin' | 'isFirstLogin'>>> {
  try {
    const serverApi = await createServerApi();
    const result = await createAuthApi(serverApi).postLogin(data);
    const { accessToken, refreshToken, message, success, ...res } = result;

    if (!success) {
      return { success: false, message: message };
    }

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true, message: '로그인 성공', ...res };
  } catch (e) {
    const error = e instanceof Error ? JSON.parse(e.message) : { message: '알 수 없는 오류' };
    return { success: false, message: error.message };
  }
}

export async function signupAction(data: SignUpFormValues) {
  try {
    const serverApi = await createServerApi();
    const result = await createAuthApi(serverApi).postSignUp(data);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message };
  } catch (e) {
    const error = e instanceof Error ? JSON.parse(e.message) : { message: '알 수 없는 오류' };
    return { success: false, message: error.message };
  }
}

export async function profileSettingAction(data: ProfileSettingFormValues) {
  try {
    const serverApi = await createServerApi();
    const result = await createMyPageApi(serverApi).postProfile({
      goal: data.goal,
      career: data.career,
      purpose: data.purposeDetail ? { type: '기타', detail: data.purposeDetail } : data.purpose,
      techStacks: data.techStacks,
    });

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message };
  } catch (e) {
    const error = e instanceof Error ? JSON.parse(e.message) : { message: '알 수 없는 오류' };
    return { success: false, message: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
