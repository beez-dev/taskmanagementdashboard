import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/** Merges Tailwind class names, resolving conflicts via tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Re-exports from project common ──────────────────────────────────────────
/**
 * Extracts the first error message per field from a Zod `flatten().fieldErrors` result.
 *
 * Zod's `error.flatten().fieldErrors` produces `Record<string, string[]>` — one or
 * more messages per field. Most UIs only display a single message per field at a time.
 * This helper collapses each array to its first element and drops fields with no errors.
 *
 * @example
 * const result = signupSchema.safeParse(data);
 * if (!result.success) {
 *   setErrors(flattenFirst(result.error.flatten().fieldErrors));
 * }
 *
 * @param errors - The `fieldErrors` map from `ZodError.flatten()`.
 * @returns A flat `Record<string, string>` with one message per field.
 */
export function flattenFirst(
    errors: Partial<Record<string, string[]>>,
): Record<string, string> {
  return Object.fromEntries(
      Object.entries(errors)
          .filter(([, msgs]) => msgs && msgs.length > 0)
          .map(([k, msgs]) => [k, msgs![0]]),
  );
}