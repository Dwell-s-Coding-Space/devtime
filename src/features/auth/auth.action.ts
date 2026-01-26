'use server';

import { cookies } from 'next/headers';
import { createServerApi } from '@/src/lib/api/server';
import { LoginFormValues } from '../login/components/LoginForm';
import { SignUpFormValues } from '../signup/components/SignUpForm';
import { createAuthApi } from './auth.api';

export async function loginAction(data: LoginFormValues) {
  try {
    const serverApi = await createServerApi();
    const result = await createAuthApi(serverApi).postLogin(data);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    const cookieStore = await cookies();
    cookieStore.set('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true, message: '로그인 성공' };
  } catch (e) {
    const error = e instanceof Error ? JSON.parse(e.message) : { message: '알 수 없는 오류' };
    return { success: false, message: error.message };
  }
}

export async function signupAction(data: SignUpFormValues) {
  const serverApi = await createServerApi();
  const result = await createAuthApi(serverApi).postSignUp(data);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return { success: true, message: result.message };
}
