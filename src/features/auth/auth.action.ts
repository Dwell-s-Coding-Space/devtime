'use server';

import { cookies } from 'next/headers';
import { LoginFormValues } from '../login/components/LoginForm';
import { postAuthLogin } from './auth.api';

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
