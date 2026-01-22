// import { getRankings } from "@/src/features/ranking/ranking.api";
import { cn } from "@/src/lib/utils";
import RankingItem from "@/src/features/ranking/components/RankingItem";
import { MOCK_RANKING_DATA } from "@/src/features/ranking/ranking.mock";

const RANKING_OPTION_MAP = {
  '총 학습 시간': 'total',
  '일 평균 학습 시간': 'avg'
}

export default async function Ranking() {
  // const data = await getRankings()
  const { data: { rankings } } = MOCK_RANKING_DATA
  const currentRankingOption = 'total'

  return (
    <div>
      {/* ranking option menu */}
      <div className="bg-background-white rounded-[12px] p-2 mb-3 w-fit">
        {Object.entries(RANKING_OPTION_MAP).map(([label, value]) => {
          const isSelected = value === currentRankingOption;

          return (
            <button key={value} className={cn("rounded-[5px] p-2", isSelected ? 'bg-background-primary-light subtitle-b text-text-secondary' : 'bg-transparent subtitle-r text-text-secondary')}>
              {label}
            </button>
          )
        })}
      </div>

      {/* ranking list */}
      <div className="flex flex-col gap-3">
        {rankings.map(ranking => <RankingItem data={ranking} key={ranking.userId} />)}
      </div>
    </div>
  );
}

