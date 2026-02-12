import { cva } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { cn } from '@/src/shared/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

const ButtonVariants = cva('h-[48px] px-4 py-3 rounded-[5px] subtitle-s', {
  variants: {
    variant: {
      primary: [
        'bg-background-primary text-text-white',
        'disabled:bg-background-disabled-dark disabled:text-text-disabled-300',
        'focus:outline-state-focus focus:outline-[1.5px]',
      ],
      secondary: [
        'bg-background-primary-light text-text-primary',
        'disabled:bg-background-disabled disabled:text-text-disabled-400',
        'focus:outline-state-focus focus:outline-[1.5px]',
      ],
      tertiary: [
        'bg-background-gray-light text-text-primary',
        'disabled:bg-background-disabled disabled:text-text-disabled-400',
        'focus:outline-state-focus focus:outline-[1.5px]',
      ],
    },
  },
});

const Button = ({ variant = 'primary', className, ...rest }: ButtonProps) => {
  return <button type="button" className={cn(ButtonVariants({ variant }), className)} {...rest} />;
};

export default Button;
