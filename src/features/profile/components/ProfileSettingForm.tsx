'use client';

import z from 'zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CAREER_OPTIONS,
  careerSchema,
  CUSTOM_PURPOSE_LABEL,
  goalSchema,
  PURPOSE_OPTIONS,
  purposeDetailSchema,
  purposeSchema,
  techStacksSchema,
} from '@/app/(navbar)/mypage/edit/page';
import { useModalStore } from '@/src/shared/store/useModalStore';
import Button from '@/src/shared/components/button/Button';
import Input from '@/src/shared/components/text-field/Input';
import Label from '@/src/shared/components/text-field/Label';
import Select from '@/src/shared/components/text-field/Select';
import TextField from '@/src/shared/components/text-field/TextField';
import AutoComplete from '@/src/shared/components/text-field/AutoComplete';
import XIcon from '@/src/shared/assets/svg/x.svg';
import { ROUTES } from '@/src/shared/constants/routes';
import { mypageQueries } from '../../mypage/mypage.queries';

const profileSettingSchema = z
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

const ProfileSettingForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const onOpen = useModalStore(state => state.onOpen);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProfileSettingFormValues>({
    resolver: zodResolver(profileSettingSchema),
    mode: 'all',
  });

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

  const { mutate: postProfile, isPending } = useMutation({
    ...mypageQueries.createProfile(),
    onSuccess: data => {
      if (data.success) {
        alert('프로필 설정을 완료하였습니다.');
        router.replace(ROUTES.HOME);
      } else {
        alert(`프로필 설정에 실패하였습니다\n${data.message}`);
      }
    },
    onError: err => {
      alert(`프로필 설정에 실패하였습니다\n${err.message}`);
    },
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

    if (isConfirmed) router.replace(ROUTES.HOME);
  };

  const onSubmit = (data: ProfileSettingFormValues) => {
    const { purposeDetail, purpose, ...res } = data;

    postProfile({
      ...res,
      purpose: purposeDetail ? { type: '기타', detail: purposeDetail } : purpose,
    });
  };

  const techStacks = useWatch({ control, name: 'techStacks' });

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

        <div className="flex flex-col gap-2">
          <Label>공부/사용 중인 기술 스택(선택)</Label>
          <AutoComplete
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
