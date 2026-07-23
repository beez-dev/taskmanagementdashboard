"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { LogoutButton } from "@/src/application/auth/logout-button";
import { SettingsDrawer } from "./settings-drawer";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-8">
        <span className="text-lg font-semibold">Dashboard</span>
        <div className="flex items-center gap-2">
          <LogoutButton />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="size-4" />
          </button>
        </div>
      </nav>

      <SettingsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
