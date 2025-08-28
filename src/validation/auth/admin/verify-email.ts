import { z } from 'zod';
import { adminUserEmailSchema } from './signup';

// Zod schema for OTP verification
export const verifyOtpSchema = z.object({
  email: adminUserEmailSchema,
  otp: z
    .string()
    .length(5, 'OTP must be 5 digits')
    .regex(/^\d{5}$/, 'OTP must be numeric'),
});
