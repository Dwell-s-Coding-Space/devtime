import { describe, expect, it } from 'vitest';

import { Time } from '@/src/shared/utils/time';

describe('Time.milliseconds', () => {
  it('음수는 예외를 던진다.', () => {
    expect(() => Time.milliseconds.from(-1)).toThrow();
  });

  it('toSeconds: 1000ms -> 1s', () => {
    expect(Time.milliseconds.toSeconds(Time.milliseconds.from(1000))).toBe(1);
  });

  it('toSeconds: 소수점 이하는 버린다.', () => {
    expect(Time.milliseconds.toSeconds(Time.milliseconds.from(1500))).toBe(1);
  });

  it('toMinutes: 60000ms -> 1m', () => {
    expect(Time.milliseconds.toMinutes(Time.milliseconds.from(60_000))).toBe(1);
  });

  it('toHours: 3600000ms -> 1h', () => {
    expect(Time.milliseconds.toHours(Time.milliseconds.from(3_600_000))).toBe(1);
  });
});

describe('Time.seconds', () => {
  it('음수는 예외를 던진다.', () => {
    expect(() => Time.seconds.from(-1)).toThrow();
  });

  it('toMilliseconds: 1s -> 1000ms', () => {
    expect(Time.seconds.toMilliseconds(Time.seconds.from(1))).toBe(1000);
  });

  it('toMinutes: 60s -> 1m', () => {
    expect(Time.seconds.toMinutes(Time.seconds.from(60))).toBe(1);
  });

  it('toMinutes: 소수점 이하는 버린다.', () => {
    expect(Time.seconds.toMinutes(Time.seconds.from(80))).toBe(1);
  });

  it('toHours: 3600s -> 1h', () => {
    expect(Time.seconds.toHours(Time.seconds.from(3600))).toBe(1);
  });
});

describe('Time.minutes', () => {
  it('음수는 예외를 던진다.', () => {
    expect(() => Time.minutes.from(-1)).toThrow();
  });

  it('toMilliseconds: 1m -> 60000ms', () => {
    expect(Time.minutes.toMilliseconds(Time.minutes.from(1))).toBe(60_000);
  });

  it('toSeconds: 1m -> 60s', () => {
    expect(Time.minutes.toSeconds(Time.minutes.from(1))).toBe(60);
  });

  it('toHours: 60m -> 1h', () => {
    expect(Time.minutes.toHours(Time.minutes.from(60))).toBe(1);
  });

  it('toHours: 소수점 이하는 버린다.', () => {
    expect(Time.minutes.toHours(Time.minutes.from(90))).toBe(1);
  });
});

describe('Time.hours', () => {
  it('음수는 예외를 던진다.', () => {
    expect(() => Time.hours.from(-1)).toThrow();
  });

  it('toMilliseconds: 1h -> 3600000ms', () => {
    expect(Time.hours.toMilliseconds(Time.hours.from(1))).toBe(3_600_000);
  });

  it('toSeconds: 1h -> 3600s', () => {
    expect(Time.hours.toSeconds(Time.hours.from(1))).toBe(3600);
  });

  it('toMinutes: 1.5h -> 90m', () => {
    expect(Time.hours.toMinutes(Time.hours.from(1.5))).toBe(90);
  });
});
