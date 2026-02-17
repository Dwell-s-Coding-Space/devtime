import z from 'zod';

import {
  confirmPasswordSchema,
  nicknameSchema,
  passwordSchema,
  PostSignUpBody,
} from '@/src/features/auth/auth.schema';
import { BaseResponse } from '@/src/shared/schema/common.schema';
import { dateString } from '@/src/shared/schema/primitives/date';

export const CUSTOM_PURPOSE_LABEL = '기타' as const;
export const CAREER_OPTIONS = ['경력 없음', '0 - 3년', '4 - 7년', '8 - 10년', '11년 이상'] as const;
export const PURPOSE_OPTIONS = [
  '취업 준비',
  '이직 준비',
  '단순 개발 역량 향상',
  '회사 내 프로젝트 원활하게 수행',
  CUSTOM_PURPOSE_LABEL,
] as const;

/**
 * 회원정보 조회
 * get /profile
 */

export const profileSchema = z.object({
  career: z.enum(CAREER_OPTIONS),
  purpose: z.string(),
  goal: z.string(),
  techStacks: z.array(z.string()),
  profileImage: z.string().nullable(),
});

export const profileResponseSchema = z.object({
  email: z.string(),
  nickname: z.string(),
  profile: z.optional(profileSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type GetProfileResponse = z.infer<typeof profileResponseSchema>;

/**
 * 프로필 생성
 * post /profile
 */

export const profileBodySchema = z
  .object({
    career: z.enum(CAREER_OPTIONS),
    purpose: z.union([
      z.enum(PURPOSE_OPTIONS),
      z.object({ type: z.literal(CUSTOM_PURPOSE_LABEL), detail: z.string() }),
    ]),
    goal: z.string(),
    techStacks: z.array(z.string()),
    profileImage: z.string().nullable(),
  })
  .partial();

export type PostProfileBody = z.infer<typeof profileBodySchema>;

/**
 * 회원정보 수정
 * put /profile
 */

export type PutProfileBody = Partial<
  Pick<PostSignUpBody, 'password'> & Pick<GetProfileResponse, 'nickname'> & Profile
>;

/**
 * 기술 스택 검색
 * get /tech-stacks
 */

export const techStackItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: dateString(),
  updatedAt: dateString(),
});

export const techStackListResponseSchema = z.object({
  results: z.array(techStackItemSchema),
});

export type TechStackItem = z.infer<typeof techStackItemSchema>;
export type GetTechStackListResponse = z.infer<typeof techStackListResponseSchema>;

/**
 * 기술 스택 추가
 * post /tech-stacks
 */

export type PostTechStackBody = Pick<TechStackItem, 'name'>;

export interface PostTechStackResponse extends Pick<BaseResponse, 'message'> {
  techStack: TechStackItem;
}

/**
 * Presigned URL 발급
 * post /file/presigned-url
 */
export const IMAGE_CONFIG = {
  mimes: ['image/png', 'image/jpeg'] as const,
  extensions: ['.png', '.jpg', '.jpeg'] as const,
  maxSizeMB: 5,
  get accept() {
    return this.extensions.join(',');
  },
  get acceptMimes() {
    return this.mimes.join(',');
  },
} as const;

export const postPresignedUrlBodySchema = z.object({
  fileName: z.string(),
  contentType: z.enum(IMAGE_CONFIG.mimes),
});

export type PostPresignedUrlBody = z.infer<typeof postPresignedUrlBodySchema>;
export type PostPresignedUrlResponse = {
  presignedUrl: string;
  key: string;
};

/**
 * profile-edit form schema
 */

export const goalSchema = z.optional(z.string());
export const careerSchema = z.optional(z.enum(CAREER_OPTIONS));
export const purposeSchema = z.optional(
  z.union([z.enum(PURPOSE_OPTIONS), z.literal(CUSTOM_PURPOSE_LABEL)])
);
export const purposeDetailSchema = z.optional(z.string());
export const techStacksSchema = z.array(z.string()).optional();
export const profileImageSchema = z
  .instanceof(File)
  .refine(
    file => file.size <= IMAGE_CONFIG.maxSizeMB * 1024 * 1024,
    `${IMAGE_CONFIG.maxSizeMB}MB 이하의 파일만 업로드 가능합니다.`
  )
  .refine(
    file => IMAGE_CONFIG.mimes.includes(file.type as (typeof IMAGE_CONFIG.mimes)[number]),
    `${IMAGE_CONFIG.extensions.join(', ')} 파일만 업로드 가능합니다.`
  )
  .optional();

export const profileEditSchema = z
  .object({
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    goal: goalSchema,
    career: careerSchema,
    purpose: purposeSchema,
    purposeDetail: purposeDetailSchema,
    techStacks: techStacksSchema,
    profileImage: profileImageSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (data.purpose === CUSTOM_PURPOSE_LABEL && !data.purposeDetail?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['purposeDetail'],
        message: '공부 목적을 입력해주세요.',
      });
    }
  });

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

/**
 * profile-setting form schema
 */

export const profileSettingSchema = z
  .object({
    goal: goalSchema,
    career: careerSchema,
    purpose: purposeSchema,
    purposeDetail: purposeDetailSchema,
    techStacks: techStacksSchema,
  })
  .superRefine((data, ctx) => {
    if (data.purpose === CUSTOM_PURPOSE_LABEL && !data.purposeDetail?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['purposeDetail'],
        message: '공부 목적을 입력해주세요.',
      });
    }
  });

export type ProfileSettingFormValues = z.infer<typeof profileSettingSchema>;
