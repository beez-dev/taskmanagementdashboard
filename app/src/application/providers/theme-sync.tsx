"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/src/application/store/hooks";

export function ThemeSync() {
  const theme = useAppSelector((s) => s.preferences.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
