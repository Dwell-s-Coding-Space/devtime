import { useEffect, useState } from 'react';
import { TimerStatus } from '../timer.types';
import { MS_IN_SECONDS } from '../utils/formatTime';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState<TimerStatus>('idle');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [pausedDuration, setPausedDuration] = useState(0);

  const startTimer = () => {
    if (mode === 'idle') {
      setStartedAt(Date.now());
    } else if (mode === 'paused' && pausedAt) {
      setPausedDuration(prev => prev + (Date.now() - pausedAt));
      setPausedAt(null);
    }

    setMode('running');
  };

  useEffect(() => {
    if (mode !== 'running' || !startedAt) return;

    const id = setInterval(() => {
      const differenceInMs = Date.now() - startedAt - pausedDuration;
      const differenceInSec = Math.floor(differenceInMs / MS_IN_SECONDS);

      console.log('secs', differenceInSec, 'startedAt', startedAt);
      setTime(differenceInSec);
    }, 1000);

    return () => clearInterval(id);
  }, [startedAt, mode, pausedDuration]);

  const pauseTimer = () => {
    setPausedAt(Date.now());
    setMode('paused');
  };

  const stopTimer = () => {
    setStartedAt(null);
    setPausedAt(null);
    setPausedDuration(0);
    setTime(0);
    setMode('idle');
  };

  return { stopTimer, startTimer, pauseTimer, time, mode };
};

export default useTimer;
