import { ComponentProps } from 'react';

import { cn } from '../../utils/cn';

interface TextareaProps extends ComponentProps<'textarea'> {
  id: string;
}

const Textarea = ({ id, className, ...rest }: TextareaProps) => {
  return (
    <textarea
      id={id}
      className={cn(
        'bg-background-gray-light placeholder:text-text-placeholder body-m text-text-g800 h-[84px] resize-none overflow-y-scroll rounded-[5px] px-4 py-3',
        className
      )}
      {...rest}
    />
  );
};

export default Textarea;
