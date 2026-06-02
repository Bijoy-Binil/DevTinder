import { z } from "zod";

export const EditProfileSchema = z.object({
  firstName: z.string().optional(),

  lastName: z.string().optional(),

  // The age input yields a string; coerce empty -> undefined and "25" -> 25
  // so a normal save validates instead of silently failing.
  age: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : Number(val),
    z.number().min(1, "Invalid age").max(120, "Invalid age").optional()
  ),

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