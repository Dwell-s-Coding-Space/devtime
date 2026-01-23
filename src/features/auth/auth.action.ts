'use server';

import { cookies } from 'next/headers';
import { LoginFormValues } from '../login/components/LoginForm';
import { SignUpFormValues } from '../signup/components/SignUpForm';
import { postAuthLogin, postSignUp } from './auth.api';

export async function loginAction(data: LoginFormValues) {
  const result = await postAuthLogin(data);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return { success: true, message: '로그인 성공' };
}

export async function signupAction(data: SignUpFormValues) {
  const result = await postSignUp(data);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return { success: true, message: result.message };
}
