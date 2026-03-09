import { Seconds } from '@/src/shared/schema/time.schema';
import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '@/src/shared/utils/time';

type Duration = {
  hours: number;
  minutes: number;
  seconds: number;
};

type DurationUnit = 'hours' | 'minutes' | 'seconds';

const DURATION_LABELS: Record<DurationUnit, string> = {
  hours: '시간',
  minutes: '분',
  seconds: '초',
};

/**
 * 초를 시/분/초로 분해합니다.
 * @param value - 분해할 초 (branded Seconds 타입)
 * @returns `{ hours, minutes, seconds }` 형태의 숫자 객체
 */

export const secondsToDuration = (seconds: Seconds): Duration => {
  return {
    hours: Math.floor(seconds / SECONDS_IN_HOUR),
    minutes: Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE),
    seconds: seconds % SECONDS_IN_MINUTE,
  };
};

/**
 * Duration을 한국어 시간 문자열로 변환합니다. (0인 단위는 생략)
 *
 * @param duration - 변환할 Duration 객체
 * @param format - 출력할 단위 배열 (기본값: ['hours', 'minutes', 'seconds'])
 * @param  defaultString - 모든 단위가 0일 때 반환할 문자열 (기본값: '0분')
 * @returns 한국어 시간 문자열
 *
 * @example
 * formatDuration({ duration: { hours: 1, minutes: 30, seconds: 0 } }) // '1시간 30분'
 * formatDuration({ duration: { hours: 0, minutes: 5, seconds: 30 }, format: ['minutes', 'seconds'] }) // '5분 30초'
 * formatDuration({ duration: { hours: 1, minutes: 0, seconds: 0 }, format: ['hours', 'minutes'] })  // '1시간 0분'
 * formatDuration({ duration: { hours: 0, minutes: 0, seconds: 0 }, defaultString: '-' }) // '-'
 */

export const formatDuration = ({
  duration,
  format = ['hours', 'minutes', 'seconds'],
  defaultString = '0분',
}: {
  duration: Duration;
  format?: DurationUnit[];
  defaultString?: string;
}) => {
  const parts = format
    .filter(unit => duration[unit] > 0)
    .map(unit => `${duration[unit]}${DURATION_LABELS[unit]}`);

  return parts.join(' ') || defaultString;
};

/**
 * 숫자를 2자리 zero-padding 문자열로 변환합니다.
 *
 * @example
 * zeroPad2(5) // '05'
 */
export const zeroPad2 = (num: number) => String(num).padStart(2, '0');
