"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signinSchema, signupSchema } from "@/src/domain/types/user";
import type { SignupInput } from "@/src/domain/types/user";
import { flattenFirst } from "@/src/common/utils";
import { LoginForm } from "@/src/presentation/components/auth/login-form";
import { SignupForm } from "@/src/presentation/components/auth/signup-form";
import { useSignin } from "@/src/application/auth/use-signin";
import { useSignup } from "@/src/application/auth/use-signup";

type AuthMode = "login" | "signup";
type LoginFieldErrors = Partial<Record<"email" | "password", string>>;
type SignupFieldErrors = Partial<Record<keyof SignupInput, string>>;

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginErrors, setLoginErrors] = useState<LoginFieldErrors>({});
  const [signupErrors, setSignupErrors] = useState<SignupFieldErrors>({});
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  const { handleSignin, isLoading: signinLoading } = useSignin(() => setIsLeaving(true));
  const { handleSignup, isLoading: signupLoading } = useSignup(() => setMode("login"));

  function handleLoginSubmit(email: string, password: string) {
    const result = signinSchema.safeParse({ email, password });
    if (!result.success) {
      setLoginErrors(flattenFirst(result.error.flatten().fieldErrors) as LoginFieldErrors);
      return;
    }
    setLoginErrors({});
    handleSignin(result.data.email, result.data.password);
  }

  function handleSignupSubmit(data: SignupInput) {
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      setSignupErrors(flattenFirst(result.error.flatten().fieldErrors) as SignupFieldErrors);
      return;
    }
    setSignupErrors({});
    handleSignup(result.data);
  }

  function switchToSignup() { setLoginErrors({}); setMode("signup"); }
  function switchToLogin() { setSignupErrors({}); setMode("login"); }

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-background p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={isLeaving ? { opacity: 0, y: -24, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      onAnimationComplete={() => { if (isLeaving) router.push("/dashboard"); }}
    >
      {mode === "login" ? (
        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={signinLoading}
          onSwitchToSignup={switchToSignup}
          fieldErrors={loginErrors}
        />
      ) : (
        <SignupForm
          onSubmit={handleSignupSubmit}
          isLoading={signupLoading}
          onSwitchToLogin={switchToLogin}
          fieldErrors={signupErrors}
        />
      )}
    </motion.div>
  );
}
