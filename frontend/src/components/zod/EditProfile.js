import { z } from "zod";

export const EditProfileSchema = z.object({
  firstName: z.string().optional(),

  lastName: z.string().optional(),

  age: z
    .number()
    .min(1, "Invalid age")
    .optional(),

  gender: z.string().optional(),

  photo_url: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Invalid URL"
    ),

  about: z.string().optional(),
});