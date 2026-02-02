import { useEffect, useRef, useState } from 'react';
import { TimerStatus } from '../timer.types';

const useTimer = () => {
  const [time, setTime] = useState(0); //ms단위
  const [mode, setMode] = useState<TimerStatus>('idle');

  const startedAt = useRef<number>(null);
  const pausedAt = useRef<number>(null);
  const pausedDuration = useRef(0);

  const updateTime = () => {
    if (!startedAt.current) return;
    const elapsedMs = Date.now() - startedAt.current - pausedDuration.current;
    setTime(elapsedMs);
  };

  useEffect(() => {
    if (mode !== 'running' || !startedAt.current) return;

    updateTime();
    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, [mode]);

  const startTimer = () => {
    if (mode === 'idle') {
      startedAt.current = Date.now();
    } else if (mode === 'paused' && pausedAt.current) {
      pausedDuration.current += Date.now() - pausedAt.current;
      pausedAt.current = null;
    }

    setMode('running');
  };

  const pauseTimer = () => {
    pausedAt.current = Date.now();
    setMode('paused');
  };

  const stopTimer = () => {
    startedAt.current = null;
    pausedAt.current = null;
    pausedDuration.current = 0;
    setTime(0);
    setMode('idle');
  };

  return { stopTimer, startTimer, pauseTimer, time, mode };
};

export default useTimer;
