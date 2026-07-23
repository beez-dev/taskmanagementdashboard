"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/application/store/hooks";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <LoadingSpinner />;
  return <>{children}</>;
}
