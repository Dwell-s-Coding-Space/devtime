'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useModal } from '@/src/lib/store/modalSlice';
import { clientApi } from '@/src/lib/api/client';
import ResetIcon from '@/src/shared/assets/svg/reset.svg';
import TodoIcon from '@/src/shared/assets/svg/todo.svg';
import { checkIsLoggedIn } from '@/src/features/auth/auth.action';
import { createTimerApi } from '@/src/features/timer/timer.api';
import { createDashboardApi } from '@/src/features/dashboard/dashboard.api';
import TimerStartModal from '@/src/features/timer/components/TimerStartModal';
import TimerRunningModal from '@/src/features/timer/components/TimerRunningModal';
import TimerStopModal from '@/src/features/timer/components/TimerStopModal';
import { ModalType } from '@/src/features/timer/timer.types';
import Timer from '@/src/features/timer/components/Timer';
import useTimer from '@/src/features/timer/hooks/useTimer';
import TimerHeader from '@/src/features/timer/components/TimerHeader';

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onOpen = useModal(state => state.onOpen);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [taskModalType, setTaskModalType] = useState<ModalType>('start');
  const { time, startTimer, pauseTimer, stopTimer, mode } = useTimer();

  const { data: isLoggedIn } = useQuery({
    queryKey: ['auth'],
    queryFn: checkIsLoggedIn,
  });

  const { data } = useQuery({
    queryKey: ['current timer'],
    queryFn: createTimerApi(clientApi).getCurrent,
  });

  const { data: studyLogData } = useQuery({
    queryKey: ['timer', data?.studyLogId],
    queryFn: () => createDashboardApi(clientApi).getStudyLogDetail(data?.studyLogId || ''),
    enabled: !!data?.studyLogId,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: createTimerApi(clientApi).deleteCurrent,
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.removeQueries({ queryKey: ['current timer'] });
      queryClient.removeQueries({ queryKey: ['timer'] });
      stopTimer();
    },
    onError: () => {
      alert('삭제하는 과정에서 에러가 발생했습니다.\n다시 시도 해주세요.');
    },
  });

  const handleStart = async () => {
    const isLoggedIn = await checkIsLoggedIn();

    if (!isLoggedIn) {
      const isConfirmClicked = await onOpen({
        title: '로그인이 필요합니다.',
        description: 'DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?',
        buttons: [
          { label: '취소', variant: 'secondary', action: 'cancel' },
          { label: '로그인하기', variant: 'primary', action: 'confirm' },
        ],
      });

      return isConfirmClicked ? router.push('/login') : null;
    }

    if (studyLogData) {
      startTimer();
    } else {
      setTaskModalType('start');
      setIsTodoModalOpen(true);
    }
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleStop = () => {
    pauseTimer();
    setTaskModalType('stop');
    setIsTodoModalOpen(true);
  };

  const handleTask = () => {
    setIsTodoModalOpen(true);
    setTaskModalType('running');
  };

  const handleDelete = async () => {
    if (!data?.timerId) return;

    const isConfirmClicked = await onOpen({
      title: '기록을 초기화 하시겠습니까?',
      description: '진행되던 타이머 기록은 삭제되고, 복구가 불가능합니다. 계속 초기화 할까요?',
      buttons: [
        { label: '취소', variant: 'secondary', action: 'cancel' },
        { label: '초기화하기', variant: 'primary', action: 'confirm' },
      ],
    });

    return isConfirmClicked ? deleteMutate(data?.timerId) : null;
  };
  return (
    <div className="mx-auto max-w-[1032px]">
      <div className="my-[96px] flex flex-col items-center gap-[50px]">
        <TimerHeader />

        <div className="relative">
          <Timer
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
            time={time}
            mode={mode}
          />
          {data && (
            <div className="absolute right-0 bottom-0 flex items-center gap-6">
              <button
                className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
                onClick={handleTask}
              >
                <TodoIcon className="text-text-primary h-12 w-12" />
              </button>
              <button
                className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
                onClick={handleDelete}
              >
                <ResetIcon className="text-text-primary h-12 w-12" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isTodoModalOpen && (
        <>
          {taskModalType === 'start' && (
            <TimerStartModal onClose={() => setIsTodoModalOpen(false)} startTimer={startTimer} />
          )}
          {taskModalType === 'running' && (
            <TimerRunningModal
              onClose={() => setIsTodoModalOpen(false)}
              data={studyLogData?.data}
            />
          )}
          {taskModalType === 'stop' && (
            <TimerStopModal
              onClose={() => setIsTodoModalOpen(false)}
              data={studyLogData?.data}
              timerId={data?.timerId}
              stopTimer={stopTimer}
            />
          )}
        </>
      )}
    </div>
  );
}
