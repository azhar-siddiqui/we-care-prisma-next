import { z } from 'zod';
import { adminUserEmailSchema } from './signup';

export const signInSchema = z.object({
  email: adminUserEmailSchema,
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must not exceed 255 characters'),
});
