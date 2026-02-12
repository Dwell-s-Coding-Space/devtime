import z from 'zod';

import { asBoolean } from '@/src/shared/schema/primitives/boolean';

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  hasNext: asBoolean(),
  hasPrev: asBoolean(),
});

export interface BaseResponse {
  success: true;
  message: string;
}
