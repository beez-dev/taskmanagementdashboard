"use client";

import { useEffect, useRef } from "react";
import type { TaskStatus } from "@/src/domain/types/task";
import { useInfiniteTasks } from "@/src/application/dashboard/use-infinite-tasks";
import { TaskCard } from "./task-card";
import { LoadingSpinner } from "@/src/presentation/components/ui/loading-spinner";

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  pending: "Pending",
  testing: "Testing",
  completed: "Completed",
};

export function TaskColumn({ status }: { status: TaskStatus }) {
  const { tasks, isFetching, loadMore } = useInfiniteTasks(status);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        //   fires one time when visible
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-0 min-w-[260px] flex-1 flex-col rounded-lg bg-muted/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{statusLabel[status]}</h3>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {/* Sentinel triggers loadMore when it scrolls into view */}
        <div ref={sentinelRef} className="h-1 shrink-0" />
        {isFetching && (
          <div className="py-2">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
