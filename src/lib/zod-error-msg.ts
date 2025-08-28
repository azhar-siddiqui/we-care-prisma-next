import { z } from "zod";

// Formats zod validation errors into a clean string or array
export function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join("; ");
}
