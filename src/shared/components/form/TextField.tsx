import { cva } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { cn } from '@/src/shared/utils/cn';

import Input from './Input';
import Label from './Label';

interface FieldProps extends ComponentProps<'input'> {
  id: string;
  label: string;
  message?: string;
  messageType?: 'error' | 'informative' | 'success';
  innerButton?: React.ReactNode;
  outerButton?: React.ReactNode;
}

const MessageVariants = cva('caption-m', {
  variants: {
    variant: {
      error: 'text-feedback-negative',
      informative: 'text-feedback-informative',
      success: 'text-feedback-positive',
    },
  },
});

const TextField = ({
  label,
  message,
  messageType,
  innerButton,
  outerButton,
  ...inputProps
}: FieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputProps.id}>{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          innerButton={innerButton}
          hasError={messageType === 'error' && !!message?.length}
          {...inputProps}
        />
        {outerButton}
      </div>
      {messageType &&
        (message ? (
          <span className={cn(MessageVariants({ variant: messageType }))}>{message}</span>
        ) : (
          <div className="h-4" />
        ))}
    </div>
  );
};

export default TextField;
