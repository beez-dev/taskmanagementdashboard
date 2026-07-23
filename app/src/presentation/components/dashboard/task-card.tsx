"use client";

import { motion } from "motion/react";
import type { Task } from "@/src/domain/types/task";
import { TASK_PRIORITIES } from "@/src/domain/types/task";
import { AppCard, AppCardContent } from "@/src/presentation/components/ui/app-card";

const priorityColor: Record<Task["priority"], string> = {
  high:   "text-red-500",
  medium: "text-amber-500",
  low:    "text-emerald-500",
};

const priorityLabel = Object.fromEntries(
  TASK_PRIORITIES.map((p) => [p, p.charAt(0).toUpperCase() + p.slice(1)]),
) as Record<Task["priority"], string>;

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  isSelected?: boolean;
}

export function TaskCard({ task, onClick, isSelected }: TaskCardProps) {
  const due = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      layoutId={`task-card-${task.id}`}
      onClick={onClick}
      className={`shrink-0 cursor-pointer ${isSelected ? "opacity-0" : ""}`}
      transition={{ duration: 0.3, ease: "easeInOut" as const }}
    >
      <AppCard className="transition-colors hover:bg-muted/50">
        <AppCardContent className="p-3">
          <p className="truncate text-sm font-semibold">{task.title}</p>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs font-medium ${priorityColor[task.priority]}`}>
              {priorityLabel[task.priority]}
            </span>
            <span className="text-xs text-muted-foreground">{due}</span>
          </div>
        </AppCardContent>
      </AppCard>
    </motion.div>
  );
}
