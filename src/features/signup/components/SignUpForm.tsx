'use client';

import z from 'zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import Button from '@/src/shared/components/button/Button';
import TextField from '@/src/shared/components/text-field/TextField';
import { postSignUp } from '../../auth/auth.api';
import { TERMS_OF_SERVICE } from '../constants';

const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailSchema = z.email('이메일 형식으로 작성해 주세요.');
export const nicknameSchema = z.string().min(1, '닉네임을 입력해 주세요.');
export const passwordSchema = z
  .string()
  .regex(password_regex, '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.');
export const confirmPasswordSchema = z.string().min(1, '비밀번호 확인을 입력해 주세요.');
export const agreeToTermsSchema = z.boolean();

const signUpSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    agreeToTerms: agreeToTermsSchema,
  })
  .superRefine((data, ctx) => {
    // ✅ superRefine가 "실제로 도는지" 확인용 로그
    console.log('[superRefine] 실행됨', {
      nickname: data.nickname,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

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

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { replace } = useRouter();
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

  const { mutate } = useMutation({
    mutationFn: postSignUp,
    onSuccess: res => {
      if (res.success) {
        alert('회원가입에 성공하였습니다.');
        replace('/login');
        return;
      }

      console.error('err', res.message);
    },
    onError: err => console.error('err', err),
  });

  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPassword');
    }
  }, [trigger, password, confirmPassword]);

  const onSubmit = (data: SignUpFormValues) => {
    console.log('on submit');
    // alert(JSON.stringify(data));
    mutate({ ...data });
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
          회원가입
        </Button>
        <Link href="/login" className="text-text-primary flex items-center justify-center gap-3">
          <span className="body-r">회원이신가요?</span>
          <span className="body-b">로그인 바로가기</span>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
