import { z } from "zod";

const TimelineDataSchema = z
  .object({
    id: z.string().optional(),
    date: z.string().transform((str) => new Date(str)),
    path: z.string(),
    title: z.string(),
    actual: z.string(),
    forecast: z.string(),
    paidValue: z.any(),
    value: z.any(),
  })
  .catchall(z.unknown());

export const TimelineDataWithId = TimelineDataSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TimelineData = z.infer<typeof TimelineDataSchema>;
export default TimelineDataSchema;
