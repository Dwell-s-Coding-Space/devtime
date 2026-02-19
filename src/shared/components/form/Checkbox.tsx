import { cva } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { cn } from '@/src/shared/utils/cn';

import { CheckIcon } from '../../assets/svg';

export type CheckboxVariant = 'todo' | 'regular';

const CheckboxVariant = cva('h-6 w-6', {
  variants: {
    variant: {
      regular: ['rounded-[5px] border border-primary bg-background-white'],
      todo: ['rounded-[8px] border-[1.5px] border-white'],
    },
    checked: {
      true: 'flex items-center justify-center',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'regular',
      checked: true,
      className: 'bg-background-primary-light text-text-primary',
    },
    {
      variant: 'todo',
      checked: true,
      className: 'bg-background-white/50 text-text-white',
    },
  ],
});

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  variant?: CheckboxVariant;
}

const Checkbox = ({ variant = 'regular', checked, className, ...props }: CheckboxProps) => {
  return (
    <span className="h-fit w-fit cursor-pointer">
      <input type="checkbox" className="sr-only" {...props} />
      <div className={cn(CheckboxVariant({ variant, checked: checked }), className)}>
        {checked && <CheckIcon />}
      </div>
    </span>
  );
};

export default Checkbox;
