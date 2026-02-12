import Skeleton from '@/src/shared/components/skeleton/Skeleton';
import SkeletonList from '@/src/shared/components/skeleton/SkeletonList';

const MyPageLoading = () => {
  return (
    <div className="bg-border-white flex gap-[56px] rounded-[12px] p-9">
      <Skeleton className="h-[180px] w-[180px] rounded-[8px]" />

      <div className="flex flex-1 flex-col gap-12">
        <Skeleton className="h-[56px]" />

        <div className="flex flex-col gap-6">
          <SkeletonList count={4} className="h-11" />
        </div>
      </div>
    </div>
  );
};

export default MyPageLoading;
