import { ComponentProps } from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends ComponentProps<'input'> {
  innerButton?: React.ReactNode;
  hasError?: boolean;
}

const Input = ({ innerButton, hasError, className, ...props }: InputProps) => {
  return (
    <div
      className={cn(
        { 'gap-4': innerButton },
        { 'outline-feedback-negative outline': hasError },
        'bg-background-gray-light flex flex-1 items-center rounded-[5px] px-4 py-3'
      )}
    >
      <input
        className={cn(
          { 'flex-1': innerButton },
          'placeholder:body-m placeholder:text-text-disabled-300 body-m text-text-g800',
          className
        )}
        {...props}
      />
      {innerButton}
    </div>
  );
};

export default Input;
