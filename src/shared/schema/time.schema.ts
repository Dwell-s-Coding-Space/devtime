import z from 'zod';

export const MillisecondsSchema = z.number().nonnegative().brand('Milliseconds');
export const SecondsSchema = z.number().nonnegative().brand('Seconds');
export const MinutesSchema = z.number().nonnegative().brand('Minutes');
export const HoursSchema = z.number().nonnegative().brand('Hours');

export type Milliseconds = z.infer<typeof MillisecondsSchema>;
export type Seconds = z.infer<typeof SecondsSchema>;
export type Minutes = z.infer<typeof MinutesSchema>;
export type Hours = z.infer<typeof HoursSchema>;
