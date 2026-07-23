"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Task, TaskStatus } from "@/src/domain/types/task";
import { useListTasksQuery } from "@/src/infrastructure/api/tasks.api";
import { TaskCard } from "./task-card";
import { TaskEditModal } from "./task-edit-modal";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";
import type { TaskFilters } from "./types";

const statusLabel: Record<TaskStatus, string> = {
  todo:      "To Do",
  pending:   "Pending",
  testing:   "Testing",
  completed: "Completed",
};

interface TaskColumnProps {
  status: TaskStatus;
  filters: TaskFilters;
}

export function TaskColumn({ status, filters }: TaskColumnProps) {
  const { data, isFetching } = useListTasksQuery({ status, page: 1, pageSize: 10000 });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks = useMemo(() => {
    let result = data?.tasks ?? [];

    if (filters.search) {
      const needle = filters.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(needle));
    }

    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }

    if (filters.sortDueDate) {
      result = [...result].sort((a, b) => {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return filters.sortDueDate === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [data?.tasks, filters.search, filters.priority, filters.sortDueDate]);

  return (
    <>
      <div className="flex min-h-0 min-w-[260px] flex-1 flex-col rounded-lg bg-muted/30 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{statusLabel[status]}</h3>
          <span className="text-xs text-muted-foreground">{tasks.length}</span>
        </div>
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </AnimatePresence>
          {isFetching && (
            <div className="py-2">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedTask && (
          <TaskEditModal task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
