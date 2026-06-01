import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().trim().nonempty("First name is required"),

  lastName: z.string().trim().optional(),

  emailId: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  age: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : Number(val),
    z
      .number({ message: "Age must be a number" })
      .min(18, "You must be at least 18")
      .max(120, "Invalid age")
      .optional()
  ),

  gender: z.string().optional(),

  photo_url: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), "Invalid URL"),

  about: z.string().max(500, "About must be under 500 characters").optional(),

  skills: z.string().optional(),
});
