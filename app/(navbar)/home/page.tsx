'use client';

import { cn } from '@/src/shared/utils/cn';
import TimerStartModal from '@/src/features/timer/components/TimerStartModal';
import TimerRunningModal from '@/src/features/timer/components/TimerRunningModal';
import TimerStopModal from '@/src/features/timer/components/TimerStopModal';
import useTimer from '@/src/features/timer/hooks/useTimer';
import useTimerPage from '@/src/features/timer/hooks/useTimerPage';
import TimerHeader from '@/src/features/timer/components/TimerHeader';
import TimerSubController from '@/src/features/timer/components/TimerSubController';
import TimerController from '@/src/features/timer/components/TimerController';
import TimerDisplay from '@/src/features/timer/components/TimerDisplay';

export default function Home() {
  const { time, startTimer, pauseTimer, stopTimer, mode } = useTimer();
  const {
    taskModalType,
    timerData,
    studyLogData,
    handleStart,
    handlePause,
    handleStop,
    handleTask,
    handleDelete,
    closeTaskModal,
  } = useTimerPage({
    startTimer,
    pauseTimer,
    stopTimer,
  });

  return (
    <div className="mx-auto max-w-[1032px]">
      <div className="my-[96px] flex flex-col items-center gap-[50px]">
        <TimerHeader />
        <div className="flex flex-col gap-20">
          <TimerDisplay time={time} />
          <div className={cn({ 'flex items-center justify-end gap-[154px]': !!timerData })}>
            <TimerController
              mode={mode}
              onStart={handleStart}
              onPause={handlePause}
              onStop={handleStop}
            />
            {timerData && (
              <TimerSubController handleDelete={handleDelete} handleTask={handleTask} />
            )}
          </div>
        </div>
      </div>

      {taskModalType === 'start' && (
        <TimerStartModal onClose={closeTaskModal} startTimer={startTimer} />
      )}
      {taskModalType === 'running' && (
        <TimerRunningModal onClose={closeTaskModal} data={studyLogData?.data} />
      )}
      {taskModalType === 'stop' && (
        <TimerStopModal
          onClose={closeTaskModal}
          data={studyLogData?.data}
          timerId={timerData?.timerId}
          stopTimer={stopTimer}
        />
      )}
    </div>
  );
}
