'use client';

import TimerStartModal from '@/src/features/timer/components/TimerStartModal';
import TimerRunningModal from '@/src/features/timer/components/TimerRunningModal';
import TimerStopModal from '@/src/features/timer/components/TimerStopModal';
import useTimer from '@/src/features/timer/hooks/useTimer';
import TimerHeader from '@/src/features/timer/components/TimerHeader';
import TimerSubController from '@/src/features/timer/components/TimerSubController';
import TimerController from '@/src/features/timer/components/TimerController';
import TimerDisplay from '@/src/features/timer/components/TimerDisplay';
import useTimerPage from '@/src/features/timer/hooks/useTimerPage';

export default function Home() {
  const { time, startTimer, pauseTimer, stopTimer, mode } = useTimer();
  const {
    isTaskModalOpen,
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

        <div className="relative">
          <TimerDisplay time={time} />
          <TimerController
            mode={mode}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
          {timerData && (
            <div className="absolute right-0 bottom-0 flex items-center gap-6">
              <TimerSubController handleDelete={handleDelete} handleTask={handleTask} />
            </div>
          )}
        </div>
      </div>

      {isTaskModalOpen && (
        <>
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
        </>
      )}
    </div>
  );
}
