"use client";

import { AuthGuard } from "@/src/application/auth/auth-guard";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
