import Skeleton from './Skeleton';

const SkeletonList = ({ count, className }: { count: number; className?: string }) => {
  return Array.from({ length: count }, (_, i) => <Skeleton key={i} className={className} />);
};

export default SkeletonList;
