"use client";

import { motion } from "motion/react";
import { useDashboardSummary } from "@/src/application/dashboard/use-dashboard-summary";
import { SummaryCard } from "@/src/presentation/components/dashboard/summary-card";
import { TaskBoard } from "@/src/presentation/components/dashboard/task-board";
import { Navbar } from "@/src/presentation/components/layout/navbar";
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
    <motion.div
      className="flex h-screen flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Navbar />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-8">
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
    </motion.div>
  );
}
