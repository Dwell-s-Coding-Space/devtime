import { cn } from '../../utils/cn';

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('bg-background-gray-dark w-full animate-pulse rounded-[5px]', className)} />
  );
};

export default Skeleton;
