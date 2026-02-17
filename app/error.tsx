'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>오류가 발생했습니다.</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
