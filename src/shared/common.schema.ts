import z from 'zod';

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});
