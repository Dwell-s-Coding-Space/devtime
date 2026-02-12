'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { PlusIcon } from '@/src/shared/assets/svg';
import Button from '@/src/shared/components/button/Button';
import Input from '@/src/shared/components/text-field/Input';
import Label from '@/src/shared/components/text-field/Label';
import Select from '@/src/shared/components/text-field/Select';
import TextField from '@/src/shared/components/text-field/TextField';
import { ROUTES } from '@/src/shared/constants/routes';
import { useModalStore } from '@/src/shared/store/useModalStore';

import { mypageQueries } from '../mypage.queries';
import {
  CAREER_OPTIONS,
  CUSTOM_PURPOSE_LABEL,
  ProfileEditFormValues,
  profileEditSchema,
  PURPOSE_OPTIONS,
} from '../mypage.schema';

export default function MypageEdit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onOpen = useModalStore(state => state.onOpen);
  const [isPending, startTransition] = useTransition();

  const { data: profileData } = useSuspenseQuery(mypageQueries.profile());

  const { mutate: updateProfile } = useMutation({
    ...mypageQueries.updateProfile(),
    onSuccess: () => {
      alert('저장이 성공적으로 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: mypageQueries.profile().queryKey });
      router.push(ROUTES.MYPAGE);
    },
    onError: err => {
      alert(`저장하는데 실패하였습니다.\n${err.message}`);
    },
  });

  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: 'all',
    defaultValues: {
      nickname: profileData.nickname,
      career: profileData.profile?.career,
      goal: profileData.profile?.goal,
      techStacks: profileData.profile?.techStacks,
      purpose: profileData.profile?.purpose,
    } as ProfileEditFormValues,
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

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
