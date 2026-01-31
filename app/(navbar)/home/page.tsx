'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/src/lib/utils';
import { useModal } from '@/src/lib/store/modalSlice';
import { clientApi } from '@/src/lib/api/client';
import TimerStart from '@/src/shared/assets/svg/timer-start.svg';
import TimerPause from '@/src/shared/assets/svg/timer-pause.svg';
import ResetIcon from '@/src/shared/assets/svg/reset.svg';
import TodoIcon from '@/src/shared/assets/svg/todo.svg';
import { checkIsLoggedIn } from '@/src/features/auth/auth.action';
import { createTimerApi } from '@/src/features/timer/timer.api';
import { createDashboardApi } from '@/src/features/dashboard/dashboard.api';
import TimerStartModal from '@/src/features/timer/components/TimerStartModal';
import TimerRunningModal from '@/src/features/timer/components/TimerRunningModal';
import TimerStopModal from '@/src/features/timer/components/TimerStopModal';
import { ModalType, TimerStatus } from '@/src/features/timer/timer.types';

const TimerStop = () => {
  return <div className="h-25 w-25 rounded-[8px] bg-current" />;
};

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<TimerStatus>('idle');

  const onOpen = useModal(state => state.onOpen);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [taskModalType, setTaskModalType] = useState<ModalType>('start');

  const { data } = useQuery({
    queryKey: ['current timer'],
    queryFn: createTimerApi(clientApi).getCurrent,
  });

  const { data: studyLogData } = useQuery({
    queryKey: ['timer', data?.studyLogId],
    queryFn: () => createDashboardApi(clientApi).getStudyLogDetail(data?.studyLogId || ''),
    enabled: !!data?.studyLogId,
  });

  const handleStartClick = async () => {
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

    setIsTodoModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1032px]">
      <div className="my-[96px] flex flex-col items-center gap-[50px]">
        <div className="text-text-secondary flex flex-col gap-2.5 text-center">
          <h1 className="text-[72px] leading-[86px] font-bold">WELCOME</h1>
          <span className="label-r">DevTime을 사용하려면 로그인이 필요합니다.</span>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex gap-12">
            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">HOURS</span>
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="bg-background-primary h-6 w-6 rounded-full" />
              <div className="bg-background-primary h-6 w-6 rounded-full" />
            </div>

            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">MINUTES</span>
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="bg-background-primary h-6 w-6 rounded-full" />
              <div className="bg-background-primary h-6 w-6 rounded-full" />
            </div>

            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">SECONDS</span>
            </div>
          </div>

          <div className={cn({ 'flex items-center justify-end gap-[134px]': !!data })}>
            <div className="flex justify-center gap-20">
              <button
                disabled={mode !== 'idle'}
                onClick={handleStartClick}
                className="disabled:text-background-primary-light text-content-primary"
              >
                <TimerStart />
              </button>
              <button
                disabled={mode === 'paused' || mode === 'idle'}
                className="disabled:text-background-primary-light text-content-primary"
              >
                <TimerPause />
              </button>
              <button
                disabled={mode !== 'idle'}
                className="disabled:text-background-primary-light text-content-primary"
                onClick={() => {
                  setIsTodoModalOpen(true);
                  setTaskModalType('stop');
                }}
              >
                <TimerStop />
              </button>
            </div>
            {data && (
              <div className="flex items-center gap-6">
                <button
                  className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
                  onClick={() => {
                    setIsTodoModalOpen(true);
                    setTaskModalType('running');
                  }}
                >
                  <TodoIcon className="text-text-primary h-12 w-12" />
                </button>
                <button
                  className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
                  onClick={() => {}}
                >
                  <ResetIcon className="text-text-primary h-12 w-12" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isTodoModalOpen && (
        <>
          {taskModalType === 'start' && (
            <TimerStartModal onClose={() => setIsTodoModalOpen(false)} />
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
            />
          )}
        </>
      )}
    </div>
  );
}
