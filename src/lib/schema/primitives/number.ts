import z from 'zod';

/**
 * 안전한 number
 */
export const asNumber = (fallback = 0) => z.coerce.number().catch(fallback);

/**
 * 정수
 */
export const asInt = (fallback = 0) => asNumber(fallback).transform(n => Math.trunc(n));

/**
 * 0 이상만
 */
export const asNonNegative = (fallback = 0) => asNumber(fallback).transform(n => (n < 0 ? 0 : n));

/**
 * 범위
 */
export const asClampedNumber = (min: number, max: number, fallback = min) =>
  asNumber(fallback).transform(n => Math.max(min, Math.min(max, n)));

/**
 * 퍼센트
 */

export const asPercentInt = (fallback = 0) =>
  asClampedNumber(0, 100, fallback).transform(n => Math.trunc(n));
