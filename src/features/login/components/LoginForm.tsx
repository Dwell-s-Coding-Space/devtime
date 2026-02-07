'use client';

import z from 'zod';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModalStore } from '@/src/shared/store/useModalStore';
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
  const onOpen = useModalStore(state => state.onOpen);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'all',
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await loginAction(data);

      if (result.success) {
        if (result.isDuplicateLogin) {
          await onOpen({
            title: `중복 로그인이 불가능합니다.`,
            description:
              '다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다.',
            buttons: [{ variant: 'primary', label: '확인', action: 'cancel' }],
          });

          return;
        }

        await onOpen({
          title: `로그인에 성공하였습니다.`,
          buttons: [{ variant: 'primary', label: '확인', action: 'cancel' }],
        });

        if (result.isFirstLogin) {
          push('/profile-setting');
        } else {
          push('/home');
        }
      } else {
        await onOpen({
          title: `로그인 정보를 다시 확인해 주세요.\n${result.message}`,
          buttons: [{ variant: 'primary', label: '확인', action: 'cancel' }],
        });
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
          type="password"
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
