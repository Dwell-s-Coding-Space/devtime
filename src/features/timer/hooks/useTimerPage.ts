import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ROUTES } from '@/src/shared/constants/routes';
import { useModalStore } from '@/src/shared/store/useModalStore';

import { authQueries } from '../../auth/auth.queries';
import { dashboardQueries } from '../../dashboard/dashboard.queries';
import { timerQueries } from '../timer.queries';
import { ModalType } from '../timer.types';
import useTimer from './useTimer';

const useTimerPage = ({
  startTimer,
  pauseTimer,
  stopTimer,
}: Pick<ReturnType<typeof useTimer>, 'startTimer' | 'pauseTimer' | 'stopTimer'>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onOpen = useModalStore(state => state.onOpen);
  const [taskModalType, setTaskModalType] = useState<ModalType | null>(null);

  const { data: isLoggedIn } = useQuery(authQueries.checkIsLoggedIn());

  const { data: timerData } = useQuery(timerQueries.current());

  const { data: studyLogData } = useQuery({
    ...dashboardQueries.studyLogDetail(timerData?.studyLogId || ''),
    enabled: !!timerData?.studyLogId,
  });

  const { mutate: deleteMutate } = useMutation({
    ...timerQueries.deleteTimer(),
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.removeQueries({ queryKey: timerQueries.current().queryKey });
      queryClient.removeQueries({ queryKey: dashboardQueries.studyLogs({}).queryKey });
      stopTimer();
    },
    onError: () => {
      alert('삭제하는 과정에서 에러가 발생했습니다.\n다시 시도 해주세요.');
    },
  });

  const openTaskModal = (type: ModalType) => {
    setTaskModalType(type);
  };

  const closeTaskModal = () => {
    setTaskModalType(null);
  };

  const handleStart = async () => {
    if (!isLoggedIn) {
      const isConfirmClicked = await onOpen({
        title: '로그인이 필요합니다.',
        description: 'DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?',
        buttons: [
          { label: '취소', variant: 'secondary', action: 'cancel' },
          { label: '로그인하기', variant: 'primary', action: 'confirm' },
        ],
      });

      return isConfirmClicked ? router.push(ROUTES.LOGIN) : null;
    }

    if (studyLogData) {
      startTimer();
    } else {
      openTaskModal('start');
    }
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleStop = () => {
    pauseTimer();
    openTaskModal('stop');
  };

  const handleTask = () => {
    openTaskModal('running');
  };

  const handleDelete = async () => {
    if (!timerData?.timerId) return;

    const isConfirmClicked = await onOpen({
      title: '기록을 초기화 하시겠습니까?',
      description: '진행되던 타이머 기록은 삭제되고, 복구가 불가능합니다. 계속 초기화 할까요?',
      buttons: [
        { label: '취소', variant: 'secondary', action: 'cancel' },
        { label: '초기화하기', variant: 'primary', action: 'confirm' },
      ],
    });

    return isConfirmClicked ? deleteMutate(timerData?.timerId) : null;
  };

  return {
    taskModalType,
    timerData,
    studyLogData,
    handleDelete,
    handlePause,
    handleStop,
    handleStart,
    handleTask,
    closeTaskModal,
  };
};

export default useTimerPage;
