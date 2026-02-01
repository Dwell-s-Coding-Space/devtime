const SECONDS_IN_MINUTE = 60;
const MINUTE_IN_HOUR = 60;

const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTE_IN_HOUR;

export const formatTime = (time: number) => {
  let _time = time;
  const result = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (_time > SECONDS_IN_HOUR) {
    result.hours = Math.floor(_time / SECONDS_IN_HOUR);
    _time %= SECONDS_IN_HOUR;
  }

  if (_time > SECONDS_IN_MINUTE) {
    result.minutes = Math.floor(_time / SECONDS_IN_MINUTE);
    _time %= SECONDS_IN_MINUTE;
  }

  result.seconds = _time;

  return {
    hours: String(result.hours).padStart(2, '0'),
    minutes: String(result.minutes).padStart(2, '0'),
    seconds: String(result.seconds).padStart(2, '0'),
  };
};
