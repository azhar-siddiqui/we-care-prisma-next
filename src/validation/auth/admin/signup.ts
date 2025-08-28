import { ALLOWED_EMAIL_DOMAINS } from '@/@types/domain';
import { z } from 'zod';

export const adminUserEmailSchema = z
  .email('Invalid email format')
  .max(191, 'Email must not exceed 191 characters')
  .refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
    },
    {
      message: `Email domain must be one of: ${ALLOWED_EMAIL_DOMAINS.join(', ')}`,
    },
  );

export const signUpAdminSchema = z.object({
  labName: z
    .string()
    .min(1, 'Lab name is required')
    .max(191, 'Lab name must not exceed 191 characters'),
  ownerName: z
    .string()
    .min(1, 'Owner name is required')
    .max(191, 'Owner name must not exceed 191 characters'),
  email: adminUserEmailSchema,
  password: z
    .string()
    .min(4, 'Password is required')
    .max(255, 'Password must not exceed 255 characters'),
  contactNumber: z
    .string()
    .min(12, 'Contact number is required with county code eg. (+91 8808808808)')
    .regex(/^\+?[1-9]\d{1,12}$/, 'Invalid phone number format'),
  // .refine((val) => isValidPhoneNumber(val, { defaultCountry: "US" }), {
  //   message: "Invalid phone number",
  // }),
  previousSoftware: z
    .string()
    .max(191, 'Previous software must not exceed 191 characters')
    .nullable()
    .optional(),
});
