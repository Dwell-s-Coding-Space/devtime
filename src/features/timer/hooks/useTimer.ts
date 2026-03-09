import { useEffect, useRef, useState } from 'react';

import { TimerStatus } from '../timer.types';

const useTimer = () => {
  const [msTime, setMsTime] = useState(0);
  const [mode, setMode] = useState<TimerStatus>('idle');

  const startedAt = useRef<number>(null);
  const pausedAt = useRef<number>(null);
  const pausedDuration = useRef(0);

  const updateTime = () => {
    if (!startedAt.current) return;
    const elapsedMs = Date.now() - startedAt.current - pausedDuration.current;
    setMsTime(elapsedMs);
  };

  useEffect(() => {
    if (mode !== 'running' || !startedAt.current) return;

    updateTime();
    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, [mode]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && mode === 'running') {
        updateTime();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
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
    setMsTime(0);
    setMode('idle');
  };

  return { stopTimer, startTimer, pauseTimer, msTime, mode };
};

export default useTimer;
