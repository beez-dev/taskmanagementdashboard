"use client";

import { toast } from "sonner";
import type { ApiError } from "@/src/domain/types/api";
import type { SignupInput } from "@/src/domain/types/user";
import { useSignupMutation } from "@/src/infrastructure/api/auth.api";

export function useSignup(onSuccess: () => void) {
  const [signup, { isLoading }] = useSignupMutation();

  async function handleSignup(data: SignupInput) {
    try {
      await signup(data).unwrap();
      toast.success("Registered successfully! Please sign in.");
      onSuccess();
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr?.message ?? "Sign up failed. Please try again.");
    }
  }

  return { handleSignup, isLoading };
}
