"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ApiError } from "@/src/domain/types/api";
import { useSigninMutation } from "@/src/infrastructure/api/auth.api";
import { useAppDispatch } from "@/src/application/store/hooks";
import { setUser } from "@/src/application/store/slices/auth.slice";

export function useSignin() {
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleSignin(email: string, password: string) {
    try {
      const user = await signin({ email, password }).unwrap();
      dispatch(setUser(user));
      router.push("/dashboard");
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr?.message ?? "Sign in failed. Please try again.");
    }
  }

  return { handleSignin, isLoading };
}
