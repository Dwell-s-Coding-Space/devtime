'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from '@/src/shared/utils/cn';
import { clientApi } from '@/src/shared/api/client';
import RankingItem from '@/src/features/ranking/components/RankingItem';
import { createRankingApi } from '@/src/features/ranking/ranking.api';

const RANKING_OPTION_MAP = {
  '총 학습 시간': 'total',
  '일 평균 학습 시간': 'avg',
};

export default function Ranking() {
  const { data } = useQuery({
    queryKey: ['ranking'],
    queryFn: createRankingApi(clientApi).getList,
  });

  const currentRankingOption = 'total';

  return (
    <div>
      {/* ranking option menu */}
      <div className="bg-background-white mb-3 w-fit rounded-[12px] p-2">
        {Object.entries(RANKING_OPTION_MAP).map(([label, value]) => {
          const isSelected = value === currentRankingOption;

          return (
            <button
              key={value}
              className={cn(
                'rounded-[5px] p-2',
                isSelected
                  ? 'bg-background-primary-light subtitle-b text-text-secondary'
                  : 'subtitle-r text-text-secondary bg-transparent'
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ranking list */}
      <div className="flex flex-col gap-3">
        {data?.data.rankings.map(ranking => (
          <RankingItem data={ranking} key={ranking.userId} />
        ))}
      </div>
    </div>
  );
}
