"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/src/application/store/provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <StoreProvider>
        {children}
        <Toaster />
      </StoreProvider>
    </ThemeProvider>
  );
}
