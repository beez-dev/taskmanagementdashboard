"use client";

import { LogoutButton } from "@/src/application/auth/logout-button";
import { useDashboardSummary } from "@/src/application/dashboard/use-dashboard-summary";
import { SummaryCard } from "@/src/presentation/components/dashboard/summary-card";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

export default function DashboardPage() {
  const { data: summary, isLoading } = useDashboardSummary();

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>

      {isLoading || !summary ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SummaryCard label="Total Tasks"   count={summary.total} />
          <SummaryCard label="Completed"     count={summary.completed} />
          <SummaryCard label="Pending"       count={summary.pending} />
          <SummaryCard label="High Priority" count={summary.highPriority} />
        </div>
      )}
    </main>
  );
}
