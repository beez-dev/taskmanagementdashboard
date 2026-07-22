import { z } from "zod";

// ─── Schemas ─────────────────────────────────────────────────────────────────

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .transform((v) => v.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .max(100, "Name must be 100 characters or fewer")
      .transform((v) => v.trim()),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Must be a valid email address")
      .transform((v) => v.toLowerCase().trim()),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((v) => !Number.isNaN(Date.parse(v)), "Must be a valid date")
      .transform((v) => new Date(v).toISOString()),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ─── Input types ─────────────────────────────────────────────────────────────

export type SigninInput = z.infer<typeof signinSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

export type UserPublic = Omit<User, "password">;
