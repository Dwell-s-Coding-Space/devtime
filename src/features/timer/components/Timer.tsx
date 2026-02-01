import TimerStartIcon from '@/src/shared/assets/svg/timer-start.svg';
import TimerPauseIcon from '@/src/shared/assets/svg/timer-pause.svg';
import { formatTime } from '../utils/formatTime';
import useTimer from '../hooks/useTimer';

const Timer = () => {
  const { time, startTimer, pauseTimer, stopTimer } = useTimer();

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex gap-12">
        <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
          <span className="timer">{hours}</span>
          <span className="label-s">HOURS</span>
        </div>

        <div className="flex flex-col justify-center gap-16">
          <div className="bg-background-primary h-6 w-6 rounded-full" />
          <div className="bg-background-primary h-6 w-6 rounded-full" />
        </div>

        <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
          <span className="timer">{minutes}</span>
          <span className="label-s">MINUTES</span>
        </div>

        <div className="flex flex-col justify-center gap-16">
          <div className="bg-background-primary h-6 w-6 rounded-full" />
          <div className="bg-background-primary h-6 w-6 rounded-full" />
        </div>

        <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
          <span className="timer">{seconds}</span>
          <span className="label-s">SECONDS</span>
        </div>
      </div>

      <div className="flex justify-center gap-20">
        <button
          onClick={startTimer}
          className="disabled:text-background-primary-light text-content-primary"
        >
          <TimerStartIcon />
        </button>
        <button
          onClick={pauseTimer}
          className="disabled:text-background-primary-light text-content-primary"
        >
          <TimerPauseIcon />
        </button>
        <button
          onClick={stopTimer}
          className="disabled:text-background-primary-light text-content-primary"
        >
          <div className="h-25 w-25 rounded-[8px] bg-current" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
