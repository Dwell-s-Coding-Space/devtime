import z from 'zod';

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export const baseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type BaseResponse = z.infer<typeof baseResponseSchema>;
