import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, 'Lab name is required')
    .max(191, 'Lab name must not exceed 191 characters'),
  contactNumber: z
    .string()
    .min(12, 'Contact number is required with county code eg. (+91 8808808808)')
    .regex(/^\+?[1-9]\d{1,12}$/, 'Invalid phone number format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must not exceed 255 characters'),
});
