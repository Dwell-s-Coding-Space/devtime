'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import Pagination from '@/src/shared/components/pagination/Pagination';

import { dashboardQueries } from '../dashboard.queries';
import StudyLogItem from './StudyLogItem';

const StudyLogList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data: studyLogListData } = useSuspenseQuery(dashboardQueries.studyLogs({ page }));

  return (
    <div className="bg-background-white flex flex-col gap-6 rounded-[18px] p-6">
      <h3 className="subtitle-s text-text-placeholder">학습 기록</h3>
      <div>
        <div className="bg-background-primary-light text-content-secondary subtitle-s flex items-center gap-[72px] rounded-t-[12px] px-9 py-5">
          <div className="w-[90px]">날짜</div>
          <div className="flex-1">목표</div>
          <div className="w-[90px]">공부 시간</div>
          <div className="w-[90px]">할 일 갯수</div>
          <div className="w-[90px]">미완료 할 일</div>
          <div className="w-[90px]">달성률</div>
          <div className="w-6"></div>
        </div>

        {studyLogListData?.data.studyLogs.map(log => (
          <StudyLogItem key={log.id} data={log}></StudyLogItem>
        ))}
      </div>

      <Pagination totalPage={studyLogListData?.data.pagination.totalPages || 1} />
    </div>
  );
};

export default StudyLogList;
