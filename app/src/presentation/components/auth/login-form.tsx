"use client";

import { useState } from "react";
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
} from "@/src/presentation/components/ui/app-card";
import { AppButton } from "@/src/presentation/components/ui/app-button";
import { CheckboxField } from "@/src/presentation/components/form/checkbox-field";
import { LabeledInput } from "@/src/presentation/components/form/labeled-input";
import { PasswordInput } from "@/src/presentation/components/form/password-input";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  onSwitchToSignup: () => void;
  fieldErrors?: { email?: string; password?: string };
}

export function LoginForm({ onSubmit, isLoading, onSwitchToSignup, fieldErrors = {} }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <AppCard className="w-full max-w-sm sm:max-w-md">
      <AppCardHeader className="text-center px-8 sm:px-10">
        <AppCardTitle className="text-3xl font-bold tracking-tight">Task Manager</AppCardTitle>
        <AppCardDescription>Sign in to your account</AppCardDescription>
      </AppCardHeader>

      <AppCardContent className="flex flex-col gap-4 px-8 sm:px-10">
        <LabeledInput
          id="login-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={isLoading}
          error={fieldErrors.email}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={isLoading}
          error={fieldErrors.password}
        />

        <CheckboxField
          id="remember-me"
          label="Remember me"
          checked={rememberMe}
          onCheckedChange={setRememberMe}
        />

        <AppButton
          type="button"
          className="w-full"
          disabled={isLoading}
          onClick={() => onSubmit(email, password)}
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </AppButton>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            role="button"
            tabIndex={0}
            onClick={onSwitchToSignup}
            onKeyDown={(e) => e.key === "Enter" && onSwitchToSignup()}
            className="cursor-pointer text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </span>
        </p>
      </AppCardContent>
    </AppCard>
  );
}
