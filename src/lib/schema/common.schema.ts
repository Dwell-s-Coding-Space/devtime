import { asBoolean } from '@/src/lib/schema/primitives/boolean';
import z from 'zod';

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  hasNext: asBoolean(),
  hasPrev: asBoolean(),
});
