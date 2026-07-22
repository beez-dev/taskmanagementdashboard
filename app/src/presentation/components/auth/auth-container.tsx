"use client";

import { useState } from "react";

import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

type AuthMode = "login" | "signup";

export function AuthContainer() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {mode === "login" ? (
        <LoginForm onSwitch={() => setMode("signup")} />
      ) : (
        <SignupForm onSwitch={() => setMode("login")} />
      )}
    </div>
  );
}
