import { ComponentProps } from 'react';
import { cn } from '@/src/lib/utils';
import CheckedIcon from '@/src/shared/assets/svg/checked.svg';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  text?: string;
}

const Checkbox = ({ checked, className, ...props }: CheckboxProps) => {
  console.log('checked', checked);
  return (
    <label className="h-fit w-fit cursor-pointer">
      <input type="checkbox" className="sr-only" checked={checked} {...props} />
      <div
        className={cn(
          'border-border-white bg-background-primary h-7 w-7 rounded-[8px] border-[1.5px]',
          {
            'border-border-white bg-background-white/50 flex items-center justify-center': checked,
          },
          className
        )}
      >
        {checked && (
          <CheckedIcon className={cn({ 'text-text-white h-[10px] w-[13px]': checked })} />
        )}
      </div>
    </label>
  );
};

export default Checkbox;
