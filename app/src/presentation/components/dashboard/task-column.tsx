"use client";

import type { TaskStatus } from "@/src/domain/types/task";
import { useTasksByStatus } from "@/src/application/dashboard/use-tasks-by-status";
import { TaskCard } from "@/src/presentation/components/dashboard/task-card";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  pending: "Pending",
  testing: "Testing",
  completed: "Completed",
};

interface TaskColumnProps {
  status: TaskStatus;
}

export function TaskColumn({ status }: TaskColumnProps) {
  const { data: tasks = [], isLoading } = useTasksByStatus(status);

  return (
    <div className="flex min-w-[260px] flex-1 flex-col rounded-lg bg-muted/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{statusLabel[status]}</h3>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1 no-scrollbar">
        {isLoading ? (
          <LoadingSpinner />
        ) : tasks.length === 0 ? (
          <p className="py-4 text-center text-xs text-muted-foreground">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
