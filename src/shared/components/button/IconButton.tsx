import { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

interface IconButtonProps extends ComponentProps<'button'> {
  'aria-label': string;
}

const IconButton = ({ className, ...rest }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'disabled:text-text-disabled-300 inline-flex items-center justify-center',
        className
      )}
      {...rest}
    />
  );
};

export default IconButton;
