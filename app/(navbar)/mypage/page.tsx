import { Suspense } from 'react';

import { MyPage, MyPageLoading } from '@/src/features/mypage';

export default function Mypage() {
  return (
    <Suspense fallback={<MyPageLoading />}>
      <MyPage />
    </Suspense>
  );
}
