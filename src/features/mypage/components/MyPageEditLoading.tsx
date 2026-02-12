import Skeleton from '@/src/shared/components/skeleton/Skeleton';
import SkeletonList from '@/src/shared/components/skeleton/SkeletonList';

const MyPageEditLoading = () => {
  return (
    <div className="bg-border-white flex flex-col gap-9 rounded-[12px] p-9">
      <Skeleton className="h-[150px] w-[150px] rounded-[8px]" />

      <div className="flex gap-[72px]">
        <div className="flex flex-1 flex-col gap-6">
          <SkeletonList count={4} className="h-[70px]" />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <SkeletonList count={4} className="h-[70px]" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <SkeletonList count={2} className="h-12 w-20" />
      </div>
    </div>
  );
};

export default MyPageEditLoading;
