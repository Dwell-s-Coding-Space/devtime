import React, { ComponentProps } from 'react';

import { cn } from '../../utils/cn';
import Button from '../button/Button';

interface ErrorBoundaryFallbackProps extends ComponentProps<'div'> {
  onRetry: () => void;
}

const ErrorBoundaryFallback = ({ onRetry, className, ...res }: ErrorBoundaryFallbackProps) => {
  return (
    <div
      className={cn(
        'bg-background-gray-light flex w-full flex-col items-center justify-center gap-5 rounded-[18px] p-8',
        className
      )}
      {...res}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-[48px] leading-none">😵‍💫</span>
        <span className="title-b text-gray-800">앗, 문제가 생겼어요!</span>
        <span className="body-r text-gray-500">잠시 후 다시 시도해주세요</span>
      </div>
      <Button variant="secondary" onClick={onRetry}>
        다시 시도하기
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
