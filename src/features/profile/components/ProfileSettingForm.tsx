'use client';

import z from 'zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CAREER_OPTIONS,
  careerSchema,
  CUSTOM_PURPOSE_LABEL,
  goalSchema,
  PURPOSE_OPTIONS,
  purposeDetailSchema,
  purposeSchema,
} from '@/app/(navbar)/mypage/edit/page';
import { useModal } from '@/src/lib/store/modalSlice';
import Button from '@/src/shared/components/button/Button';
import Input from '@/src/shared/components/text-field/Input';
import Label from '@/src/shared/components/text-field/Label';
import Select from '@/src/shared/components/text-field/Select';
import TextField from '@/src/shared/components/text-field/TextField';
import { profileSettingAction } from '../../auth/auth.action';

const profileSettingSchema = z
  .object({
    goal: goalSchema,
    career: careerSchema,
    purpose: purposeSchema,
    purposeDetail: purposeDetailSchema,
    // techStacks: techStacksSchema,
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

const ProfileSettingForm = () => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const onOpen = useModal(state => state.onOpen);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileSettingFormValues>({
    resolver: zodResolver(profileSettingSchema),
    mode: 'all',
  });

  const handleSkip = async () => {
    const isConfirmed = await onOpen({
      title: '프로필 설정을 건너뛸까요?',
      description:
        '프로필을 설정하지 않을 경우 일부 기능 사용에 제한이 생길 수 있습니다. 그래도 프로필 설정을 건너뛰시겠습니까?',
      buttons: [
        { label: '건너뛰기', action: 'confirm', variant: 'tertiary' },
        { label: '계속 설정하기', action: 'cancel', variant: 'primary' },
      ],
    });

    if (isConfirmed) replace('/home');
  };

  const onSubmit = (data: ProfileSettingFormValues) => {
    startTransition(async () => {
      const result = await profileSettingAction(data);

      if (result.success) {
        alert('프로필 설정을 완료하였습니다.');
        replace('/home');
      } else {
        alert(`프로필 설정에 실패하였습니다\n${result.message}`);
      }
    });
  };

  return (
    <form className="flex w-full max-w-[420px] flex-col gap-9" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="heading-b text-text-primary text-center">프로필 설정</h1>
      <div className="flex flex-1 flex-col gap-10">
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

      <div className="flex flex-col gap-6">
        <Button className="w-full" type="submit" disabled={!isValid}>
          {isPending ? '저장중...' : '저장하기'}
        </Button>
        <button
          type="button"
          onClick={handleSkip}
          className="text-text-primary flex items-center justify-center gap-3"
        >
          <span className="body-r">다음에 하시겠어요?</span>
          <span className="body-b">건너뛰기</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingForm;
