import type { SigninInput, SignupInput } from "@/src/common/types/user";
import { errors } from "./response";

const NAME_MAX = 100;
const PASSWORD_MIN = 8;

const isString = (v: unknown): v is string => typeof v === "string";
const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function requireString(value: unknown, field: string, max?: number): string {
  if (!isString(value) || value.trim().length === 0) {
    throw errors.validation(`Field '${field}' is required`, { field });
  }
  if (max && value.length > max) {
    throw errors.validation(`Field '${field}' exceeds ${max} characters`, { field });
  }
  return value.trim();
}

function requireEmail(value: unknown): string {
  const email = requireString(value, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw errors.validation("Field 'email' must be a valid email address", { field: "email" });
  }
  return email.toLowerCase();
}

function requirePassword(value: unknown, field = "password"): string {
  const pwd = requireString(value, field);
  if (pwd.length < PASSWORD_MIN) {
    throw errors.validation(
      `Field '${field}' must be at least ${PASSWORD_MIN} characters`,
      { field },
    );
  }
  return pwd;
}

function requireIsoDate(value: unknown, field: string): string {
  if (!isString(value) || value.trim().length === 0) {
    throw errors.validation(`Field '${field}' is required`, { field });
  }
  const t = Date.parse(value);
  if (Number.isNaN(t)) {
    throw errors.validation(`Field '${field}' is not a valid date`, { field });
  }
  return new Date(t).toISOString();
}

export function parseSignupInput(body: unknown): SignupInput {
  if (!isObject(body)) {
    throw errors.validation("Request body must be a JSON object");
  }

  const name = requireString(body.name, "name", NAME_MAX);
  const email = requireEmail(body.email);
  const dob = requireIsoDate(body.dob, "dob");
  const password = requirePassword(body.password);
  const confirmPassword = requirePassword(body.confirmPassword, "confirmPassword");

  if (password !== confirmPassword) {
    throw errors.validation("Passwords do not match", {
      field: "confirmPassword",
    });
  }

  return { name, email, dob, password, confirmPassword };
}

export function parseSigninInput(body: unknown): SigninInput {
  if (!isObject(body)) {
    throw errors.validation("Request body must be a JSON object");
  }
  return {
    email: requireEmail(body.email),
    password: requireString(body.password, "password"),
  };
}

export function buildUser(input: SignupInput) {
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
