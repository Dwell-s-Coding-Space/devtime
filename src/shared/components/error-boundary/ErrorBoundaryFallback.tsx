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
        'bg-background-gray-light flex w-full flex-col items-center justify-center gap-3 rounded-[8px] p-5',
        className
      )}
      {...res}
    >
      <span className="title-b text-red">에러가 발생하였습니다!</span>
      <span className="subtitle-s">다시 시도해주세요.</span>
      <Button variant="secondary" onClick={onRetry}>
        다시 시도하기
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
