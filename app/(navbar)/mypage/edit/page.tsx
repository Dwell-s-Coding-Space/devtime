import { Suspense } from 'react';

import { MyPageEdit, MyPageEditLoading } from '@/src/features/mypage';

export default function MypageEdit() {
  return (
    <Suspense fallback={<MyPageEditLoading />}>
      <MyPageEdit />
    </Suspense>
  );
}
