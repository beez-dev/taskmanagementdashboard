"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/application/store/hooks";
import { setTheme } from "@/src/application/store/slices/preferences.slice";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.preferences.theme);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-card shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">Settings</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 px-5 py-6">
              {/* Theme */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Appearance
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(setTheme("light"))}
                    className={`flex flex-col items-center gap-2 rounded-lg border px-4 py-4 text-sm font-medium transition-colors ${
                      theme === "light"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Sun className="size-5" />
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(setTheme("dark"))}
                    className={`flex flex-col items-center gap-2 rounded-lg border px-4 py-4 text-sm font-medium transition-colors ${
                      theme === "dark"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Moon className="size-5" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
