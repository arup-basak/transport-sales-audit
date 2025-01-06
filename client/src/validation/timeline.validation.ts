import { z } from "zod";
import NumberParser from "intl-number-parser";

const parse = NumberParser();

const valueSchema = z
  .union([z.string(), z.number(), z.null()])
  .transform((val) => {
    if (val === null) return 0;
    if (typeof val === "string") {
      const parsed = Number(val.replace(/[^\d.-]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return isNaN(val) ? 0 : Number(val);
  })
  .default(0);

const TimelineDataSchema = z
  .object({
    id: z.string().optional(),
    date: z.string().transform((str) => new Date(str)),
    path: z.string(),
    title: z.string(),
    actual: z.string(),
    forecast: z.string(),
    paidValue: valueSchema,
    value: valueSchema,
  })
  .catchall(z.unknown());

export type TimelineData = z.infer<typeof TimelineDataSchema>;
export default TimelineDataSchema;

export const convertToTimelineData = (data: any): TimelineData => {
  if ("time" in data) {
    const combinedDate = `${data.date} ${data.time || ""}`;
    data = { ...data, date: combinedDate };
  }

  if (!("value" in data) && "actual" in data && "forecast" in data) {
    data = {
      ...data,
      value: parse(data.actual) + parse(data.forecast),
    };
  }

  console.log(data);
  return TimelineDataSchema.parse(data);
};
