import z from 'zod';

/**
 * 안전한 문자열
 */
export const asString = (fallback = '') =>
  z.coerce
    .string()
    .transform(s => s.trim())
    .catch(fallback);

/**
 * 빈 문자열이면 null
 */
export const asStringOrNull = () =>
  z.coerce
    .string()
    .transform(s => s.trim())
    .transform(s => (s === '' ? null : s))
    .catch(null);

/**
 * 빈 문자열의 경우 fallback으로 표현
 */
export const asDisplayString = (fallback = '—') => asString('').transform(s => (s ? s : fallback));
