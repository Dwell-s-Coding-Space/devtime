import { describe, expect, it } from 'vitest';

import { Seconds } from '@/src/shared/schema/time.schema';

import { formatDuration, secondsToDuration, zeroPad2 } from './formatTime';

const sec = (n: number) => n as Seconds;

describe('secondsToDuration', () => {
  it('시/분/초로 분해한다', () => {
    expect(secondsToDuration(sec(3661))).toEqual({ hours: 1, minutes: 1, seconds: 1 });
  });

  it('1시간 미만을 분/초로 분해한다.', () => {
    expect(secondsToDuration(sec(90))).toEqual({ hours: 0, minutes: 1, seconds: 30 });
  });

  it('1분 미만을 초로 분해한다.', () => {
    expect(secondsToDuration(sec(45))).toEqual({ hours: 0, minutes: 0, seconds: 45 });
  });

  it('0초를 분해한다.', () => {
    expect(secondsToDuration(sec(0))).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it('정확히 1시간을 분해한다.', () => {
    expect(secondsToDuration(sec(3600))).toEqual({ hours: 1, minutes: 0, seconds: 0 });
  });

  it('정확히 1분을 분해한다.', () => {
    expect(secondsToDuration(sec(60))).toEqual({ hours: 0, minutes: 1, seconds: 0 });
  });
});

describe('formatDuration', () => {
  it('0인 단위는 생략한다.', () => {
    expect(formatDuration({ duration: { hours: 1, minutes: 30, seconds: 0 } })).toBe('1시간 30분');
  });

  it('모든 단위가 0이면 defaultString을 반환한다.', () => {
    expect(formatDuration({ duration: { hours: 0, minutes: 0, seconds: 0 } })).toBe('0분');
  });

  it('모든 단위가 0이면 커스텀 defaultString을 반환한다.', () => {
    expect(
      formatDuration({ duration: { hours: 0, minutes: 0, seconds: 0 }, defaultString: '기록 없음' })
    ).toBe('기록 없음');
  });

  it('세 단위가 모두 있으면 모두 출력한다.', () => {
    expect(formatDuration({ duration: { hours: 1, minutes: 30, seconds: 45 } })).toBe(
      '1시간 30분 45초'
    );
  });

  it('format 배열로 출력 단위를 제한한다.', () => {
    expect(
      formatDuration({
        duration: { hours: 1, minutes: 30, seconds: 45 },
        format: ['hours', 'minutes'],
      })
    ).toBe('1시간 30분');
  });

  it('format 배열에 포함되어도 0이면 생략한다.', () => {
    expect(
      formatDuration({
        duration: { hours: 1, minutes: 0, seconds: 45 },
        format: ['hours', 'minutes'],
      })
    ).toBe('1시간');
  });
});

describe('zeroPad2', () => {
  it('한 자리 숫자에 zero-padding을 적용한다.', () => {
    expect(zeroPad2(5)).toBe('05');
  });

  it('두 자리 숫자는 그대로 반환한다.', () => {
    expect(zeroPad2(15)).toBe('15');
  });

  it('0을 패딩한다.', () => {
    expect(zeroPad2(0)).toBe('00');
  });
});
