import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { GetRankingListResponse } from '@/src/features/ranking/ranking.schema';

interface RankingItemProps {
  data: GetRankingListResponse['data']['rankings'][number];
}

const RankingItem = ({ data }: RankingItemProps) => {
  const {
    rank,
    nickname,
    profile: { profileImage, purpose, techStacks, career },
    totalStudyTime,
    averageStudyTime,
  } = data;
  const isTop3 = rank >= 1 && rank <= 3;

  return (
    <div className="bg-background-white flex gap-9 rounded-[12px] px-6 py-3">
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'inline-flex h-[30px] w-fit items-center rounded-[8px] px-2',
            isTop3
              ? 'bg-background-primary text-text-white'
              : 'bg-background-primary-light text-text-primary'
          )}
        >
          <span className="title-b">{rank}위</span>
        </div>
        {profileImage ? (
          <Image src={''} alt="profile" width={80} height={80} />
        ) : (
          <div className="bg-background-disabled h-20 w-20 rounded-full" />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-text-primary flex flex-col">
          <span className="title-b">{nickname}</span>
          <span className="body-m">{purpose}</span>
        </div>
        <dl className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <dt className="text-text-g500 body-r">누적</dt>
            <dd className="text-text-g700 body-s">{Math.floor(totalStudyTime)}시간</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-text-g500 body-r">일 평균</dt>
            <dd className="text-text-g700 body-s">{Math.floor(averageStudyTime)}시간</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-text-g500 body-r">경력</dt>
            <dd className="text-text-g700 body-s">{career}</dd>
          </div>
        </dl>
        <div className="flex items-center gap-2">
          {techStacks.map(tech => (
            <div
              key={tech.id}
              className="bg-background-gray-dark body-m text-text-g500 rounded-[5px] px-2 py-1"
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
