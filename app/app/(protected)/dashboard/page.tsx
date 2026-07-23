"use client";

import { LogoutButton } from "@/src/application/auth/logout-button";
import { useDashboardSummary } from "@/src/application/dashboard/use-dashboard-summary";
import { SummaryCard } from "@/src/presentation/components/dashboard/summary-card";
import { TaskBoard } from "@/src/presentation/components/dashboard/task-board";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();

  return (
    <main className="flex h-screen flex-col overflow-hidden p-4 sm:p-8">
      <div className="mb-3 flex items-center justify-between sm:mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>

      {summaryLoading || !summary ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          <SummaryCard label="Total Tasks"   count={summary.total} />
          <SummaryCard label="Completed"     count={summary.completed} />
          <SummaryCard label="Pending"       count={summary.pending} />
          <SummaryCard label="High Priority" count={summary.highPriority} />
        </div>
      )}

      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-6">
        <TaskBoard />
      </div>
    </main>
  );
}
