'use client';

import z from 'zod';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/src/shared/components/button/Button';
import TextField from '@/src/shared/components/text-field/TextField';
import { emailSchema, passwordSchema } from '../../signup/components/SignUpForm';
import { loginAction } from '../../auth/auth.action';

const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'all',
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await loginAction(data);

      if (result.success) {
        alert('로그인 성공');
        push('/');
      } else {
        setError('root', { message: result.message });
      }
    });
  };

  return (
    <form className="flex w-[328px] flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <TextField
          label="아이디"
          placeholder="이메일 주소를 입력해 주세요."
          {...register('email')}
          messageType={errors.email && 'error'}
          message={errors.email?.message}
        />
        <TextField
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          {...register('password')}
          messageType={errors.password && 'error'}
          message={errors.password?.message}
        />
      </div>
      <div className="flex w-full flex-col gap-6">
        <Button type="submit" variant="primary" disabled={!isValid}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
        <Link href={'/signup'} className="label-m text-text-primary text-center">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
