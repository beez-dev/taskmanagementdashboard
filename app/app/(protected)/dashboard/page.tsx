"use client";

import { LogoutButton } from "@/src/application/auth/logout-button";

// TODO
export default function DashboardPage() {
  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hello dashboard</h1>
        <LogoutButton />
      </div>
    </main>
  );
}
