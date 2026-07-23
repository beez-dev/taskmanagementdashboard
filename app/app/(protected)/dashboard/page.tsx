"use client";

import { motion } from "motion/react";
import { LogoutButton } from "@/src/application/auth/logout-button";
import { useDashboardSummary } from "@/src/application/dashboard/use-dashboard-summary";
import { SummaryCard } from "@/src/presentation/components/dashboard/summary-card";
import { TaskBoard } from "@/src/presentation/components/dashboard/task-board";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.3, ease: "easeOut" as const } },
};

const CARDS = [
  { label: "Total Tasks",   key: "total"        },
  { label: "Completed",     key: "completed"    },
  { label: "Pending",       key: "pending"      },
  { label: "High Priority", key: "highPriority" },
] as const;

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
        <motion.div
          className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {CARDS.map(({ label, key }) => (
            <motion.div key={key} variants={cardVariants}>
              <SummaryCard label={label} count={summary[key]} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-6">
        <TaskBoard />
      </div>
    </main>
  );
}
