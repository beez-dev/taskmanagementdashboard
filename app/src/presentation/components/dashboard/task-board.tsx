"use client";

import { useState } from "react";
import { TASK_STATUSES, type TaskStatus } from "@/src/domain/types/task";
import { TaskColumn } from "./task-column";

const statusLabel: Record<TaskStatus, string> = {
  todo:      "To Do",
  pending:   "Pending",
  testing:   "Testing",
  completed: "Completed",
};

export function TaskBoard() {
  const [active, setActive] = useState<TaskStatus>(TASK_STATUSES[0]);

  return (
    <div className="h-full">

      {/* Small / Medium: tabbed single-column view */}
      <div className="flex h-full flex-col lg:hidden">
        <div className="mb-3 flex shrink-0 border-b border-muted">
          {TASK_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActive(status)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                active === status
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {statusLabel[status]}
            </button>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <TaskColumn status={active} />
        </div>
      </div>

      {/* Large: 4-column kanban row */}
      <div className="hidden h-full gap-3 overflow-x-auto pb-4 lg:flex">
        {TASK_STATUSES.map((status) => (
          <TaskColumn key={status} status={status} />
        ))}
      </div>

    </div>
  );
}
