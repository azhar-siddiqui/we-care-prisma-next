import { ALLOWED_EMAIL_DOMAINS } from "@/@types/domain";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const adminUserEmailSchema = z
  .email("Invalid email format")
  .max(191, "Email must not exceed 191 characters")
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
    },
    {
      message: `Email domain must be one of: ${ALLOWED_EMAIL_DOMAINS.join(
        ", "
      )}`,
    }
  );

export const signUpAdminSchema = z.object({
  labName: z
    .string()
    .min(1, "Lab name is required")
    .max(191, "Lab name must not exceed 191 characters"),
  ownerName: z
    .string()
    .min(1, "Owner name is required")
    .max(191, "Owner name must not exceed 191 characters"),
  email: adminUserEmailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must not exceed 255 characters"),
  contactNumber: z.string().refine(
    (val) => {
      // If value is undefined or empty, consider it valid (since optional)
      if (!val) return true;
      // Call isValidPhoneNumber with the non-undefined value
      return isValidPhoneNumber(val, { defaultCountry: "US" }); // Adjust defaultCountry as needed
    },
    { message: "Invalid phone number" }
  ),
  previousSoftware: z
    .string()
    .max(191, "Previous software must not exceed 191 characters")
    .nullable()
    .optional(),
});
