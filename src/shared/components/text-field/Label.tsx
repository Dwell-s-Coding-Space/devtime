import { ComponentProps } from 'react';
import { cn } from '@/src/shared/utils/cn';

const Label = ({ className, ...props }: ComponentProps<'label'>) => {
  return <label className={cn('label-m text-text-g600', className)} {...props} />;
};

export default Label;
