"use client";

import { useState } from "react";
import { TASK_STATUSES, type TaskStatus } from "@/src/domain/types/task";
import { TaskColumn } from "./task-column";
import { TaskFiltersBar } from "./task-filters";
import { DEFAULT_FILTERS, type TaskFilters } from "./types";

const statusLabel: Record<TaskStatus, string> = {
  todo:      "To Do",
  pending:   "Pending",
  testing:   "Testing",
  completed: "Completed",
};

export function TaskBoard() {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);

  const visibleStatuses = filters.status
    ? TASK_STATUSES.filter((s) => s === filters.status)
    : TASK_STATUSES;

  const [activeTab, setActiveTab] = useState<TaskStatus>(TASK_STATUSES[0]);
  const activeStatus = filters.status
    ? (filters.status as TaskStatus)
    : activeTab;

  return (
    <div className="flex h-full flex-col">
      <TaskFiltersBar filters={filters} onChange={setFilters} />

      {/* Small / Medium: tabbed single-column view */}
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <div className="mb-3 flex shrink-0 border-b border-muted">
          {TASK_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveTab(status)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeStatus === status
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {statusLabel[status]}
            </button>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <TaskColumn status={activeStatus} filters={filters} />
        </div>
      </div>

      {/* Large: 4-column kanban row */}
      <div className="hidden min-h-0 flex-1 gap-3 overflow-x-auto pb-4 lg:flex">
        {visibleStatuses.map((status) => (
          <TaskColumn key={status} status={status} filters={filters} />
        ))}
      </div>
    </div>
  );
}
