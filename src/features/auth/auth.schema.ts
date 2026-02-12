import z from 'zod';

import { BaseResponse } from '@/src/shared/schema/common.schema';

/**
 * 회원가입
 * post /signup
 */
export const PostSignUpBodySchema = z.object({
  email: z.email(),
  nickname: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type PostSignUpBody = z.infer<typeof PostSignUpBodySchema>;

/**
 * 이메일 중복 확인
 * get /signup/check-email
 */
export interface GetCheckEmailResponse extends BaseResponse {
  available: boolean;
}

/**
 * 닉네임 중복 확인
 * get /signup/check-nickname
 */

export interface GetCheckNicknameResponse extends BaseResponse {
  available: boolean;
}

/**
 * 사용자 로그인
 * post /auth/login
 */
export type PostLoginBody = Pick<PostSignUpBody, 'email' | 'password'>;

export interface PostLoginResponse extends BaseResponse {
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

/**
 * 액세스 토큰 갱신
 * post /auth/refresh
 */
export type PostRefreshBody = Pick<PostLoginResponse, 'refreshToken'>;
export interface PostRefreshResponse extends Omit<BaseResponse, 'message'> {
  accessToken: string;
}

/**
 * sign up form schema
 */

const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailSchema = z.email('이메일 형식으로 작성해 주세요.');
export const nicknameSchema = z.string().min(1, '닉네임을 입력해 주세요.');
export const passwordSchema = z
  .string()
  .regex(password_regex, '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.');
export const confirmPasswordSchema = z.string().min(1, '비밀번호 확인을 입력해 주세요.');
export const agreeToTermsSchema = z.boolean();

export const signUpSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    agreeToTerms: agreeToTermsSchema,
  })
  .superRefine((data, ctx) => {
    if (data.agreeToTerms !== true) {
      ctx.addIssue({
        code: 'custom',
        message: '이용약관에 동의해 주세요.',
        path: ['agreeToTerms'],
      });
    }

    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

/**
 * login form schema
 */

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
