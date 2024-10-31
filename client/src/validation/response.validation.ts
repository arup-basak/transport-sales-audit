import { z } from "zod";

const responseValidation = z.object({
  success: z.boolean().default(true),
  message: z.any().default(""),
  data: z.any().nullable(),
});

export interface Response <T> {
  success: boolean;
  message: string;
  data: T;
}

export default responseValidation;
