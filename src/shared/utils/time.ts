import {
  type Hours,
  HoursSchema,
  type Milliseconds,
  MillisecondsSchema,
  type Minutes,
  MinutesSchema,
  type Seconds,
  SecondsSchema,
} from '@/src/shared/schema/time.schema';

export const MS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;

export const MS_IN_MINUTE = MS_IN_SECOND * SECONDS_IN_MINUTE;
export const MS_IN_HOUR = MS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

/**
 * 시간 단위 변환 유틸리티
 *
 * 각 단위(`milliseconds`, `seconds`, `minutes`, `hours`)별로
 * `from()`으로 branded type을 생성하고, `toXxx()`로 단위를 변환합니다.
 *
 * @example
 * const ms = Time.milliseconds.from(apiResponse.elapsedTime)
 * const sec = Time.milliseconds.toSeconds(ms)
 *
 * Time.seconds.toHours(Time.seconds.from(3600)) // 1
 */

export const Time = {
  milliseconds: {
    from: (value: number): Milliseconds => MillisecondsSchema.parse(value),
    toSeconds: (value: Milliseconds): Seconds => Math.floor(value / MS_IN_SECOND) as Seconds,
    toMinutes: (value: Milliseconds): Minutes => Math.floor(value / MS_IN_MINUTE) as Minutes,
    toHours: (value: Milliseconds): Hours => Math.floor(value / MS_IN_HOUR) as Hours,
  },
  seconds: {
    from: (value: number): Seconds => SecondsSchema.parse(value),
    toMilliseconds: (value: Seconds): Milliseconds => (value * MS_IN_SECOND) as Milliseconds,
    toMinutes: (value: Seconds): Minutes => Math.floor(value / SECONDS_IN_MINUTE) as Minutes,
    toHours: (value: Seconds): Hours => Math.floor(value / SECONDS_IN_HOUR) as Hours,
  },
  minutes: {
    from: (value: number): Minutes => MinutesSchema.parse(value),
    toMilliseconds: (value: Minutes): Milliseconds => (value * MS_IN_MINUTE) as Milliseconds,
    toSeconds: (value: Minutes): Seconds => Math.floor(value * SECONDS_IN_MINUTE) as Seconds,
    toHours: (value: Minutes): Hours => Math.floor(value / MINUTES_IN_HOUR) as Hours,
  },
  hours: {
    from: (value: number): Hours => HoursSchema.parse(value),
    toMilliseconds: (value: Hours): Milliseconds => (value * MS_IN_HOUR) as Milliseconds,
    toSeconds: (value: Hours): Seconds => Math.floor(value * SECONDS_IN_HOUR) as Seconds,
    toMinutes: (value: Hours): Minutes => Math.floor(value * MINUTES_IN_HOUR) as Minutes,
  },
};
