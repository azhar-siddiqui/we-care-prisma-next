import { ALLOWED_EMAIL_DOMAINS } from '@/@types/domain';
import z from 'zod';

export const doctorFormSchema = z.object({
  doctorName: z
    .string()
    .min(2, {
      message: 'Doctor name must be at least 2 characters.',
    })
    .max(191, 'Doctor name must not exceed 191 characters'),
  email: z
    .string()
    .optional()
    .refine(
      (email) => {
        if (!email || email === '') return true;
        const emailSchema = z.email('Invalid email format');
        const result = emailSchema.safeParse(email);
        if (!result.success) return false;
        if (email.length > 191) return false;
        const domain = email.split('@')[1]?.toLowerCase();
        return domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
      },
      {
        message: `Email must be valid and have a domain from: ${ALLOWED_EMAIL_DOMAINS.join(', ')}`,
      },
    ),
  commission: z // Corrected from 'comission'
    .number({
      message: 'Commission must be a number.',
    })
    .min(0, {
      message: 'Commission cannot be negative.',
    })
    .max(100, {
      message: 'Commission cannot exceed 100%.',
    }),
  phone: z
    .string()
    .regex(/^\+?\d+$/, "Phone number must contain only digits and an optional leading '+'")
    .min(10, 'Phone number must be at least 10 characters long (including country code)')
    .max(15, 'Phone number must not exceed 15 characters'),
  degree: z.string().min(2, {
    message: 'Degree must be at least 2 characters.',
  }),
  referredById: z.uuid('Invalid referredById').optional(),
});
