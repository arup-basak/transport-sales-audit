import { z } from "zod";

const TimelineDataSchema = z
  .object({
    date: z.string().transform((str) => new Date(str)),
    actual: z.string(),
    forecast: z.string(),
    value: z.number().default(0),
  })
  .catchall(z.unknown());

export const TimelineDataWithId = TimelineDataSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TimelineData = z.infer<typeof TimelineDataSchema>;
export default TimelineDataSchema;
