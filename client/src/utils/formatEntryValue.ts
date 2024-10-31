import { format } from "date-fns";

export const formatEntryValue = (value: unknown): string => {
  // Handle null/undefined
  if (value == null) {
    return "";
  }

  // Handle date strings
  if (typeof value === "string") {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? format(date, "dd MMM yyyy") : String(value);
  }

  // Handle Date objects
  if (value instanceof Date) {
    return format(value, "dd MMM yyyy");
  }

  // Handle objects
  if (typeof value === "object") {
    return "";
  }

  return String(value);
};
