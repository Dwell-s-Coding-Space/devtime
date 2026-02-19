'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { dashboardQueries } from '../dashboard.queries';
import StatBox from './StatBox';

const StatSummary = () => {
  const { data } = useSuspenseQuery(dashboardQueries.stats());

  return (
    <dl className="grid grid-cols-2 grid-rows-2 gap-4">
      <StatBox value={data.totalStudyTime} label="누적 공부 시간" type="time" />
      <StatBox value={data.consecutiveDays} label="누적 공부 일수" type="day" />
      <StatBox value={data.averageDailyStudyTime} label="하루 평균 공부 시간" type="time" />
      <StatBox value={data.taskCompletionRate} label="목표 달성률" type="rate" />
    </dl>
  );
};

export default StatSummary;
