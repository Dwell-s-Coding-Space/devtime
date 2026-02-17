import Link from 'next/link';

import Button from '@/src/shared/components/button/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3">
        <span className="text-[64px] leading-none">🔍</span>
        <span className="title-b text-xl text-gray-800">페이지를 찾을 수 없어요!</span>
        <span className="body-r text-gray-500">주소가 맞는지 다시 확인해주세요</span>
      </div>
      <Link href="/">
        <Button variant="secondary">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
