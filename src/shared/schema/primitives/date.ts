import z from 'zod';

/**
 * date 검증 + fallback null
 */
export const asDateOrNull = () =>
  z.coerce
    .string()
    .transform((s): Date | null => {
      const d = new Date(s);
      return Number.isNaN(d.getTime()) ? null : d;
    })
    .catch(null);
