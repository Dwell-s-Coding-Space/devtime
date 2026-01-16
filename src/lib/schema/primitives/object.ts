import z, { ZodType } from 'zod';

/**
 * array : fallback []
 */

export const asArray = <T extends ZodType>(item: T) => z.array(item).catch([]);

/**
 * array : 단일 item, null도 빈배열 처리
 */

export const asArrayFromAny = <T extends ZodType>(item: T) =>
  z
    .preprocess(v => {
      if (v == null) return [];
      return Array.isArray(v) ? v : [v];
    }, z.array(item))
    .catch([]);

/**
 * object : fallback {}
 */

export const asRecord = <V extends ZodType>(value: V) =>
  z.record(z.string(), value).catch({});
