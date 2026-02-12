import Skeleton from '@/src/shared/components/skeleton/Skeleton';
import SkeletonList from '@/src/shared/components/skeleton/SkeletonList';

const RankingPageLoading = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* ranking option menu */}
      <Skeleton className="h-[54px] w-[270px] bg-gray-300" />

      {/* ranking list */}
      <div className="flex flex-col gap-3">
        <SkeletonList className="h-[150px] bg-gray-300" count={5} />
      </div>
    </div>
  );
};

export default RankingPageLoading;
