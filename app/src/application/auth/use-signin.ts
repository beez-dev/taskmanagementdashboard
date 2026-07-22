"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ApiError } from "@/src/domain/types/api";
import { useSigninMutation } from "@/src/infrastructure/api/auth.api";

export function useSignin() {
  const [signin, { isLoading }] = useSigninMutation();
  const router = useRouter();

  async function handleSignin(email: string, password: string) {
    try {
      await signin({ email, password }).unwrap();
      router.push("/dashboard");
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr?.message ?? "Sign in failed. Please try again.");
    }
  }

  return { handleSignin, isLoading };
}
