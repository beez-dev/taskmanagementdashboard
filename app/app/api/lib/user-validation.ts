import { z } from "zod";
import { signinSchema, signupSchema } from "./types";
import { zodToApiError } from "./response";

export function parseSignupInput(body: unknown) {
  const result = signupSchema.safeParse(body);
  if (!result.success) throw zodToApiError(result.error);
  return result.data;
}

export function parseSigninInput(body: unknown) {
  const result = signinSchema.safeParse(body);
  if (!result.success) throw zodToApiError(result.error);
  return result.data;
}

export function buildUser(input: z.infer<typeof signupSchema>) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    password: input.password,
    dob: input.dob,
    createdAt: now,
    updatedAt: now,
  };
}
