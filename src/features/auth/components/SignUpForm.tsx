'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Button from '@/src/shared/components/button/Button';
import TextField from '@/src/shared/components/text-field/TextField';
import { ROUTES } from '@/src/shared/constants/routes';

import { TERMS_OF_SERVICE } from '../auth.constants';
import { authQueries } from '../auth.queries';
import { SignUpFormValues, signUpSchema } from '../auth.schema';

const SignUpForm = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    ...authQueries.signUp(),
    onSuccess: data => {
      if (data.success) {
        alert('회원가입에 성공하였습니다.');
        router.replace(ROUTES.LOGIN);
      } else {
        alert(`회원가입에 실패하였습니다\n${data.message}`);
      }
    },
    onError: err => {
      alert(`회원가입에 실패하였습니다\n${err.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
  });

  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPassword');
    }
  }, [trigger, password, confirmPassword]);

  const onSubmit = (data: SignUpFormValues) => {
    mutate(data);
  };

  return (
    <form className="flex w-full max-w-[420px] flex-col gap-9" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="heading-b text-text-primary text-center">회원가입</h1>
      <div className="flex flex-col gap-4">
        <TextField
          label="아이디"
          {...register('email')}
          messageType={errors.email && 'error'}
          message={errors.email?.message}
        />
        <TextField
          label="닉네임"
          {...register('nickname')}
          messageType={errors.nickname && 'error'}
          message={errors.nickname?.message}
        />
        <TextField
          label="비밀번호"
          type="password"
          {...register('password')}
          messageType={errors.password && 'error'}
          message={errors.password?.message}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          {...register('confirmPassword')}
          messageType={errors.confirmPassword && 'error'}
          message={errors.confirmPassword?.message}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="label-m">이용약관</span>
          <label className="body-s text-text-primary-30">
            동의함
            <input type="checkbox" className="ml-1" {...register('agreeToTerms')} />
          </label>
        </div>
        <div className="bg-background-gray-light text-text-g600 caption-r h-[110px] overflow-y-scroll rounded-[5px] px-4 py-3">
          {TERMS_OF_SERVICE}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Button className="w-full" type="submit" disabled={!isValid}>
          {isPending ? '회원가입 중...' : '회원가입'}
        </Button>
        <Link
          href={ROUTES.LOGIN}
          className="text-text-primary flex items-center justify-center gap-3"
        >
          <span className="body-r">회원이신가요?</span>
          <span className="body-b">로그인 바로가기</span>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
