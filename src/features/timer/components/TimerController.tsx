import { TimerPauseIcon, TimerStartIcon } from '@/src/shared/assets/svg';

import { TimerStatus } from '../timer.types';

interface TimerControllerProps {
  mode: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

const TimerController = ({ mode, onStart, onStop, onPause }: TimerControllerProps) => {
  return (
    <div className="flex justify-center gap-20">
      <button
        onClick={onStart}
        disabled={mode === 'running'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <TimerStartIcon />
      </button>
      <button
        onClick={onPause}
        disabled={mode === 'paused' || mode === 'idle'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <TimerPauseIcon />
      </button>
      <button
        onClick={onStop}
        disabled={mode === 'idle'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <div className="h-25 w-25 rounded-[8px] bg-current" />
      </button>
    </div>
  );
};

export default TimerController;
