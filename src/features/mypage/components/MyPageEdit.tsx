'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { PlusIcon, XIcon } from '@/src/shared/assets/svg';
import Button from '@/src/shared/components/button/Button';
import AutoComplete from '@/src/shared/components/form/AutoComplete';
import Input from '@/src/shared/components/form/Input';
import Label from '@/src/shared/components/form/Label';
import Select from '@/src/shared/components/form/Select';
import TextField from '@/src/shared/components/form/TextField';
import { ROUTES } from '@/src/shared/constants/routes';
import { useModalStore } from '@/src/shared/store/useModalStore';
import { getS3ImageUrl } from '@/src/shared/utils/url';

import { mypageQueries } from '../mypage.queries';
import {
  CAREER_OPTIONS,
  CUSTOM_PURPOSE_LABEL,
  IMAGE_CONFIG,
  ProfileEditFormValues,
  profileEditSchema,
  PURPOSE_OPTIONS,
} from '../mypage.schema';

export default function MypageEdit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const onOpen = useModalStore(state => state.onOpen);

  const { data: techStacksData } = useQuery({
    ...mypageQueries.techStacks(),
    select: data => data.results.map(techStack => techStack.name),
  });

  const { mutateAsync: addTechStack } = useMutation({
    ...mypageQueries.createTechStack(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageQueries.techStacks().queryKey });
    },
    onError: err => {
      alert(`추가하는데 실패하였습니다.\n${err.message}`);
    },
  });

  const { data: profileData } = useSuspenseQuery(mypageQueries.profile());

  const { mutate: updateProfile, isPending } = useMutation({
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

  const { mutateAsync: createPresignedUrl } = useMutation({
    ...mypageQueries.createPresignedUrl(),
  });

  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
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
  const profileImage = useWatch({ control, name: 'profileImage' });
  const techStacks = useWatch({ control, name: 'techStacks' });

  const profileImageSrc = useMemo(() => {
    if (profileImage) return URL.createObjectURL(profileImage);
    if (profileData.profile?.profileImage) return getS3ImageUrl(profileData.profile.profileImage);
    return null;
  }, [profileImage, profileData.profile?.profileImage]);

  useEffect(() => {
    return () => {
      if (profileImageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImageSrc);
      }
    };
  }, [profileImageSrc]);

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

  const onSubmit = async () => {
    const { profileImage, ...rest } = getValues();

    let profileImageUrl = profileData.profile?.profileImage;

    if (profileImage) {
      try {
        const { presignedUrl, key } = await createPresignedUrl({
          fileName: profileImage.name,
          contentType: profileImage.type as Parameters<typeof createPresignedUrl>[0]['contentType'],
        });

        const s3UploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': profileImage.type,
          },
          body: profileImage,
        });

        if (!s3UploadResponse.ok) {
          throw new Error(`S3 업로드 실패: ${s3UploadResponse.status}`);
        }

        profileImageUrl = key;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message.includes('S3')
              ? 'S3 업로드에 실패했습니다.'
              : '이미지 업로드 준비에 실패했습니다.'
            : '이미지 업로드에 실패했습니다.';

        alert(message);
        return;
      }
    }

    updateProfile({ ...rest, profileImage: profileImageUrl });
  };

  return (
    <form>
      <div className="bg-background-white flex flex-col gap-9 rounded-[12px] p-9">
        <div className="flex flex-col gap-2">
          <Label>프로필 이미지</Label>
          <div className="flex items-end gap-3">
            <input
              id="file-input"
              type="file"
              accept={IMAGE_CONFIG.accept}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) setValue('profileImage', file, { shouldValidate: true });
              }}
            />
            <label
              htmlFor="file-input"
              className="relative h-30 w-30 overflow-hidden rounded-[8px]"
            >
              {profileImageSrc ? (
                <Image src={profileImageSrc} alt="profile" fill className="object-cover" />
              ) : (
                <div className="border-primary flex h-full w-full items-center justify-center rounded-[8px] border border-dashed">
                  <PlusIcon className="text-content-primary h-9 w-9" />
                </div>
              )}
            </label>

            <span className="text-text-placeholder lable-m">
              {IMAGE_CONFIG.maxSizeMB}MB 미만의 {IMAGE_CONFIG.extensions.join(', ')} 파일
            </span>
          </div>
        </div>

        <div className="flex gap-[72px]">
          <div className="flex flex-1 flex-col gap-6">
            <TextField
              id="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              {...register('nickname')}
              messageType={errors.nickname && 'error'}
              message={errors.nickname?.message}
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="purpose-select">공부 목적</Label>
              <Controller
                name="purpose"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      id="purpose-select"
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
              id="new-password"
              label="새 비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register('password')}
              messageType={errors.password && 'error'}
              message={errors.password?.message}
            />

            <TextField
              id="new-password-confirm"
              label="새 비밀번호 재입력"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요."
              {...register('confirmPassword')}
              messageType={errors.confirmPassword && 'error'}
              message={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="career-select">개발 경력</Label>
              <Controller
                name="career"
                control={control}
                render={({ field }) => (
                  <Select
                    id="career-select"
                    value={field.value as (typeof CAREER_OPTIONS)[number]}
                    placeholder="개발 경력을 선택해 주세요."
                    options={CAREER_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <TextField
              id="goal"
              label="공부 목표"
              placeholder="공부 목표를 입력해 주세요."
              {...register('goal')}
              messageType={errors.goal && 'error'}
              message={errors.goal?.message}
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="select-techStack">공부/사용 중인 기술 스택(선택)</Label>
              <AutoComplete
                id="select-techStack"
                placeholder="기술 스택을 검색해 등록해 주세요."
                options={techStacksData || []}
                onSelect={stack => {
                  const currentStacks = getValues('techStacks') || [];
                  if (!currentStacks?.includes(stack)) {
                    setValue('techStacks', [...currentStacks, stack]);
                  }
                }}
                onAdd={value => addTechStack({ name: value })}
              />
              <div className="flex flex-wrap items-center gap-2">
                {techStacks?.map(stack => (
                  <div
                    className="text-text-primary bg-background-primary-light border-border-primary flex h-11 items-center gap-2 rounded-[5px] border p-3"
                    key={stack}
                  >
                    {stack}
                    <button
                      onClick={() => {
                        const filteredStacks = techStacks.filter(item => item !== stack);
                        setValue('techStacks', filteredStacks);
                      }}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button variant="tertiary" onClick={() => router.push(ROUTES.MYPAGE)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!isValid}>
            {isPending ? '변경 사항 저장 중...' : '변경 사항 저장하기'}
          </Button>
        </div>
      </div>
    </form>
  );
}
