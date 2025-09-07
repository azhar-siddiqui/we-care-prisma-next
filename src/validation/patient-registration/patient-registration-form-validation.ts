import { ALLOWED_EMAIL_DOMAINS } from '@/@types/domain';
import { Age, Designation, Gender } from '@/generated/prisma';
import z from 'zod';

export const patientRegistrationFormSchema = z.object({
  date: z.date(),
  doctorId: z.uuid(),
  designation: z.enum(Designation),
  patientName: z.string().min(2, { message: 'Patient name required' }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{7,14}$/.test(val), {
      message: 'Invalid phone number format. Example: +918808808808',
    }),
  gender: z.enum(Gender),
  email: z
    .string()
    .optional() // Make email optional
    .refine(
      (email) => {
        // Skip validation if email is undefined or empty
        if (!email || email === '') return true;
        // Validate email format
        const emailSchema = z.email('Invalid email format');
        const result = emailSchema.safeParse(email);
        if (!result.success) return false;
        // Validate max length
        if (email.length > 191) return false;
        // Validate domain
        const domain = email.split('@')[1]?.toLowerCase();
        return domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
      },
      {
        message: `Email must be valid and have a domain from: ${ALLOWED_EMAIL_DOMAINS.join(', ')}`,
      },
    ),
  age: z
    .number({
      message: 'Age required',
    })
    .min(0, { message: 'Age cannot be negative' })
    .max(150, { message: 'Age cannot exceed 150' }),
  ageType: z.enum(Age),
  address: z.string().optional(),
});
