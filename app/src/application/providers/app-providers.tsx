"use client";

import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/src/application/store/provider";
import { ThemeSync } from "./theme-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeSync />
      {children}
      <Toaster />
    </StoreProvider>
  );
}
