import { Column } from "@/components/DataTable";
import { type TimelineData } from "@/validation/timeline.validation";

export const income_column: Column<TimelineData>[] = [
  { key: "title", header: "Title" },
  { key: "path", header: "Path" },
  { key: "date", header: "Date" },
  { key: "actual", header: "Actual" },
  { key: "forecast", header: "Forecast" },
  { key: "value", header: "Value" },
];
