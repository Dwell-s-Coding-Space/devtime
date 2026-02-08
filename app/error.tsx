'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/constants/routes';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.status === 401) {
        alert('다시 로그인 해주세요.');
        router.push(ROUTES.LOGIN);
      }
    } catch {}
  }, [error, router]);

  return <div>오류가 발생했습니다.</div>;
}
