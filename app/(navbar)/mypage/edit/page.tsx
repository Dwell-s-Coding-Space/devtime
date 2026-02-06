'use client';

import z from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PlusIcon from '@/src/shared/assets/svg/plus.svg';
import Button from '@/src/shared/components/button/Button';
import Label from '@/src/shared/components/text-field/Label';
import TextField from '@/src/shared/components/text-field/TextField';
import Select from '@/src/shared/components/text-field/Select';
import Input from '@/src/shared/components/text-field/Input';
import {
  confirmPasswordSchema,
  nicknameSchema,
  passwordSchema,
} from '@/src/features/signup/components/SignUpForm';
import { useModal } from '@/src/lib/store/modalSlice';
import { createMyPageApi } from '@/src/features/mypage/mypage.api';
import { clientApi } from '@/src/lib/api/client';

export const CUSTOM_PURPOSE_LABEL = '기타' as const;
export const CAREER_OPTIONS = ['경력 없음', '0 - 3년', '4 - 7년', '8 - 10년', '11년 이상'] as const;
export const PURPOSE_OPTIONS = [
  '취업 준비',
  '이직 준비',
  '단순 개발 역량 향상',
  '회사 내 프로젝트 원활하게 수행',
  CUSTOM_PURPOSE_LABEL,
] as const;

export const goalSchema = z.optional(z.string());
export const careerSchema = z.optional(z.enum(CAREER_OPTIONS));
export const purposeSchema = z.optional(
  z.union([z.enum(PURPOSE_OPTIONS), z.literal(CUSTOM_PURPOSE_LABEL)])
);
export const purposeDetailSchema = z.optional(z.string());
export const techStacksSchema = z.array(z.string()).optional();

const profileEditSchema = z
  .object({
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    goal: goalSchema,
    career: careerSchema,
    purpose: purposeSchema,
    purposeDetail: purposeDetailSchema,
    techStacks: techStacksSchema,
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

export default function MypageEdit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onOpen = useModal(state => state.onOpen);
  const [isPending, startTransition] = useTransition();

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: createMyPageApi(clientApi).getProfile,
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: createMyPageApi(clientApi).putProfile,
    onSuccess: () => {
      alert('저장이 성공적으로 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/mypage');
    },
    onError: err => {
      alert(`저장하는데 실패하였습니다.\n${err.message}`);
    },
  });

  const {
    register,
    control,
    trigger,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: 'all',
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

  useEffect(() => {
    if (profileData) {
      reset({
        nickname: profileData.nickname,
        goal: profileData?.profile?.goal,
        career: profileData?.profile?.career as ProfileEditFormValues['career'],
        purpose: profileData?.profile?.purpose as ProfileEditFormValues['purpose'],
      });
    }
  }, [profileData, reset]);

  const handleSave = async () => {
    const isConfirmed = await onOpen({
      title: '변경 사항을 저장하시겠습니까?',
      buttons: [
        { variant: 'tertiary', label: '취소', action: 'cancel' },
        { variant: 'primary', label: '저장하기', action: 'confirm' },
      ],
    });

    if (isConfirmed) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    const data = getValues();
    startTransition(async () => {
      updateProfile(data);
    });
  };

  return (
    <form>
      <div className="bg-background-white flex flex-col gap-9 rounded-[12px] p-9">
        <div className="flex flex-col gap-2">
          <Label>프로필 이미지</Label>
          <input id="file-input" type="file" className="hidden" />
          <label htmlFor="file-input" className="flex items-end gap-3">
            <div className="border-primary flex h-30 w-30 items-center justify-center rounded-[8px] border border-dashed">
              <PlusIcon className="text-content-primary h-9 w-9" />
            </div>
            <span className="text-text-g500 lable-m">5MB 미만의 .png, .jpg 파일</span>
          </label>
        </div>

        <div className="flex gap-[72px]">
          <div className="flex flex-1 flex-col gap-6">
            <TextField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              {...register('nickname')}
              messageType={errors.nickname && 'error'}
              message={errors.nickname?.message}
            />
            <TextField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register('password')}
              messageType={errors.password && 'error'}
              message={errors.password?.message}
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요."
              {...register('confirmPassword')}
              messageType={errors.confirmPassword && 'error'}
              message={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>개발 경력</Label>
              <Controller
                name="career"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value as (typeof CAREER_OPTIONS)[number]}
                    placeholder="개발 경력을 선택해 주세요."
                    options={CAREER_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>공부 목적</Label>
              <Controller
                name="purpose"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      value={field.value as (typeof PURPOSE_OPTIONS)[number]}
                      placeholder="공부의 목적을 선택해 주세요."
                      options={PURPOSE_OPTIONS}
                      onChange={field.onChange}
                    />
                    {field.value === CUSTOM_PURPOSE_LABEL && (
                      <Input
                        placeholder="공부 목적을 직접 입력해주세요"
                        {...register('purposeDetail')}
                      />
                    )}
                  </>
                )}
              />
            </div>

            <TextField
              label="공부 목표"
              placeholder="공부 목표를 입력해 주세요."
              {...register('goal')}
              messageType={errors.goal && 'error'}
              message={errors.goal?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button variant="tertiary">취소</Button>
          <Button variant="primary" onClick={handleSave} disabled={!isValid}>
            {isPending ? '변경 사항 저장 중...' : '변경 사항 저장하기'}
          </Button>
        </div>
      </div>
    </form>
  );
}
