import { TimerPauseIcon, TimerStartIcon } from '@/src/shared/assets/svg';
import IconButton from '@/src/shared/components/button/IconButton';

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
      <IconButton
        aria-label="타이머 시작"
        onClick={onStart}
        disabled={mode === 'running'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <TimerStartIcon />
      </IconButton>
      <IconButton
        aria-label="타이머 중단"
        onClick={onPause}
        disabled={mode === 'paused' || mode === 'idle'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <TimerPauseIcon />
      </IconButton>
      <IconButton
        aria-label="타이머 종료"
        onClick={onStop}
        disabled={mode === 'idle'}
        className="disabled:text-background-primary-light text-content-primary"
      >
        <div className="h-25 w-25 rounded-[8px] bg-current" />
      </IconButton>
    </div>
  );
};

export default TimerController;
