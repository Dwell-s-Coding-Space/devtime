'use client';

import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/src/lib/api/client';
import StatBox from '@/src/features/dashboard/components/StatBox';
import StudyLogList from '@/src/features/dashboard/components/StudyLogList';
import WeeklyStatBar from '@/src/features/dashboard/components/WeeklyStatBar';
import YearlyStatGrid from '@/src/features/dashboard/components/YearlyStatGrid';
import { createDashboardApi } from '@/src/features/dashboard/dashboard.api';

export default function Dashboard() {
  const { data: statData } = useQuery({
    queryKey: ['stat'],
    queryFn: createDashboardApi(clientApi).getStats,
  });

  const { data: heatmapData } = useQuery({
    queryKey: ['heatmap'],
    queryFn: createDashboardApi(clientApi).getHeatmap,
  });

  if (!statData || !heatmapData) return <div>loading..</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <StatBox value={statData.totalStudyTime} label="누적 공부 시간" type="time" />
            <StatBox value={statData.consecutiveDays} label="누적 공부 일수" type="day" />
            <StatBox
              value={statData.averageDailyStudyTime}
              label="하루 평균 공부 시간"
              type="time"
            />
            <StatBox value={statData.taskCompletionRate} label="목표 달성률" type="rate" />
          </div>
          <WeeklyStatBar data={statData.weekdayStudyTime} />
        </div>
        <YearlyStatGrid data={heatmapData.heatmap} />
        <StudyLogList />
      </div>
    </>
  );
}
