import { useState } from 'react';
import { TimerStatus } from '../timer.types';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [mode, setMode] = useState<TimerStatus>('idle');

  const startTimer = () => {
    const id = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    setTimerIntervalId(id);
    setMode('running');
  };

  const pauseTimer = () => {
    if (!timerIntervalId) return;
    clearInterval(timerIntervalId);
    setTimerIntervalId(null);
    setMode('paused');
  };

  const stopTimer = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimerIntervalId(null);
    setTime(0);
    setMode('idle');
  };

  return { stopTimer, startTimer, pauseTimer, time, mode };
};

export default useTimer;
