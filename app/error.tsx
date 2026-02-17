'use client';

import Button from '@/src/shared/components/button/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3">
        <span className="text-[64px] leading-none">🫠</span>
        <span className="title-b text-xl text-gray-800">이런, 뭔가 잘못됐어요!</span>
        <span className="body-r text-gray-500">예상치 못한 오류가 발생했어요</span>
      </div>
      <Button variant="secondary" onClick={reset}>
        다시 시도하기
      </Button>
    </div>
  );
}
