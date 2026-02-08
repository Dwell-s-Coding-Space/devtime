import z, { ZodType } from 'zod';

export const fetchWithValidation = async <T>(
  shema: ZodType<T>,
  fetcher: () => Promise<unknown>
): Promise<T> => {
  const data = await fetcher();
  const result = shema.safeParse(data);

  if (!result.success) {
    throw new Error(
      JSON.stringify({
        status: 422,
        message: 'Invlaid response from server',
        errors: z.flattenError(result.error).fieldErrors,
      })
    );
  }

  return result.data;
};
