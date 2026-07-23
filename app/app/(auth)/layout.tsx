"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/application/store/hooks";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <LoadingSpinner />;
  return <>{children}</>;
}
