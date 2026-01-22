import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { GetRankingListResponse } from "@/src/features/ranking/ranking.schema";

interface RankingItemProps {
  data: GetRankingListResponse['data']['rankings'][number];
}

const RankingItem = ({ data }: RankingItemProps) => {
  const { rank, nickname, profile: { profileImage, purpose, techStacks, career }, totalStudyTime, averageStudyTime } = data
  const isTop3 = rank >= 1 && rank <= 3;

  return (
    <div className="px-6 py-3 bg-background-white rounded-[12px] flex gap-9">
      <div className="flex flex-col gap-4">
        <div className={cn("h-[30px] rounded-[8px] px-2 inline-flex items-center w-fit", isTop3 ? "bg-background-primary text-text-white" : "bg-background-primary-light text-text-primary")}>
          <span className="title-b">{rank}위</span>
        </div>
        {profileImage ? <Image src={profileImage} alt="profile" width={80} height={80} /> : <div className="w-20 h-20 bg-background-disabled rounded-full" />}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col text-text-primary">
          <span className="title-b">{nickname}</span>
          <span className="body-m">{purpose}</span>
        </div>
        <dl className="flex gap-6 items-center">
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
            <div key={tech.id} className="rounded-[5px] bg-background-gray-dark px-2 py-1 body-m text-text-g500">
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default RankingItem;