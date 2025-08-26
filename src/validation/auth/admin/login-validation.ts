import { z } from "zod";
import { adminUserEmailSchema } from "./signup-validation";

export const loginSchema = z.object({
  email: adminUserEmailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must not exceed 255 characters"),
});
