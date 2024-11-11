import { z } from "zod";

const valueSchema = z
  .union([z.string(), z.number(), z.null()])
  .transform((val) => {
    if (val === null) return 0;
    if (typeof val === "string") {
      const parsed = Number(val.replace(/[^\d.-]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return val;
  })
  .default(0);

const TimelineDataSchema = z
  .object({
    id: z.string().optional(),
    date: z.string().transform((str) => new Date(str)),
    actual: z.string(),
    forecast: z.string(),
    paidValue: valueSchema,
    value: valueSchema,
  })
  .catchall(z.unknown());

export type TimelineData = z.infer<typeof TimelineDataSchema>;
export default TimelineDataSchema;
