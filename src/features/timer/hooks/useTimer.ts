import { useState } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    setTimerIntervalId(id);
  };

  const pauseTimer = () => {
    if (!timerIntervalId) return;
    clearTimeout(timerIntervalId);
    setTimerIntervalId(null);
  };

  const stopTimer = () => {
    if (timerIntervalId) {
      clearTimeout(timerIntervalId);
    }
    setTimerIntervalId(null);
    setTime(0);
  };

  return { stopTimer, startTimer, pauseTimer, time };
};

export default useTimer;
