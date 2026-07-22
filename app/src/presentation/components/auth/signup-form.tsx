"use client";

import { useState } from "react";

import { AppButton } from "@/src/presentation/components/ui/app-button";
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
} from "@/src/presentation/components/ui/app-card";
import { LabeledInput } from "@/src/presentation/components/form/labeled-input";
import { PasswordInput } from "@/src/presentation/components/form/password-input";

interface SignupFormProps {
  onSwitch: () => void;
}

export function SignupForm({ onSwitch }: SignupFormProps) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AppCard className="w-full max-w-sm sm:max-w-md">
      <AppCardHeader className="text-center px-8 sm:px-10">
        <AppCardTitle className="text-3xl font-bold tracking-tight">Task Manager</AppCardTitle>
        <AppCardDescription>Create a new account</AppCardDescription>
      </AppCardHeader>

      <AppCardContent className="flex flex-col gap-4 px-8 sm:px-10">
        <LabeledInput
          id="signup-name"
          label="Full name"
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <LabeledInput
          id="signup-dob"
          label="Date of birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <LabeledInput
          id="signup-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <PasswordInput
          id="signup-password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <PasswordInput
          id="signup-confirm-password"
          label="Confirm password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <AppButton type="button" className="w-full">
          Create account
        </AppButton>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            role="button"
            tabIndex={0}
            onClick={onSwitch}
            onKeyDown={(e) => e.key === "Enter" && onSwitch()}
            className="cursor-pointer text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </span>
        </p>
      </AppCardContent>
    </AppCard>
  );
}
