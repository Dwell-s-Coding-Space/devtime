import z from 'zod';

/**
 * truthy, falsy value를 fallback과 함께 안전하게 boolean으로 처리
 */
export const asBoolean = (fallback = false) =>
  z
    .preprocess(v => {
      if (v === 'true' || v === '1' || v === 1) return true;
      if (v === 'false' || v === '0' || v === 0) return false;
      return v;
    }, z.boolean())
    .catch(fallback);
