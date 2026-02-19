'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';

import { TrashIcon } from '@/src/shared/assets/svg';
import IconButton from '@/src/shared/components/button/IconButton';
import { useModalStore } from '@/src/shared/store/useModalStore';

import { dashboardQueries } from '../dashboard.queries';
import { StudyLogListResponse } from '../dashboard.schema';
import TaskViewModal from './TaskViewModal';

interface StudyLogItemProps {
  data: StudyLogListResponse['data']['studyLogs'][number];
}

const StudyLogItem = ({ data }: StudyLogItemProps) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = useModalStore(state => state.onOpen);

  const { mutate: deleteMutate } = useMutation({
    ...dashboardQueries.deleteStudyLog(),
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: dashboardQueries.stats().queryKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueries.heatmap().queryKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueries.studyLogsKey() });
    },
    onError: () => {
      alert('삭제하는 과정에서 에러가 발생했습니다.\n다시 시도 해주세요.');
    },
  });

  const { id, date, todayGoal, studyTime, totalTasks, incompleteTasks, completionRate } = data;
  const formattedDate = date?.toLocaleString().replaceAll('-', '.') || '-';

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!data?.id) return;

    const isConfirmClicked = await onOpen({
      title: '기록을 삭제 하시겠습니까?',
      description: '한 번 삭제된 학습 기록은 다시 복구할 수 없습니다. 그래도 계속 하시겠습니까?',
      buttons: [
        { label: '취소', variant: 'secondary', action: 'cancel' },
        { label: '삭제하기', variant: 'primary', action: 'confirm' },
      ],
    });

    return isConfirmClicked ? deleteMutate(data.id) : null;
  };

  return (
    <>
      <div
        key={id}
        className="text-text-g700 body-m border-border-gray flex cursor-pointer items-center gap-[72px] border-b px-9 py-[26px]"
        onClick={handleView}
      >
        <div className="w-[90px]">{formattedDate}</div>
        <div className="flex-1">{todayGoal}</div>
        <div className="w-[90px]">{studyTime}</div>
        <div className="w-[90px]">{totalTasks}</div>
        <div className="w-[90px]">{incompleteTasks}</div>
        <div className="w-[90px]">{completionRate}%</div>
        <div className="w-6">
          <IconButton aria-label="학습 로그 삭제" onClick={handleDelete}>
            <TrashIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>

      {isModalOpen && <TaskViewModal onClose={() => setIsModalOpen(false)} studyLogId={id} />}
    </>
  );
};

export default StudyLogItem;
