import { BaseResponse } from '@/src/shared/schema/common.schema';
import z from 'zod';

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
