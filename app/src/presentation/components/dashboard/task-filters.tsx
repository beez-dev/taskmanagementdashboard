"use client";

import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/src/domain/types/task";
import type { TaskFilters } from "./types";

const statusLabel: Record<string, string> = {
  todo: "To Do",
  pending: "Pending",
  testing: "Testing",
  completed: "Completed",
};

const priorityLabel: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const sortCycle = ["", "asc", "desc"] as const;

interface TaskFiltersProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

export function TaskFiltersBar({ filters, onChange }: TaskFiltersProps) {
  function set<K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function cycleSortDueDate() {
    const next = sortCycle[(sortCycle.indexOf(filters.sortDueDate) + 1) % sortCycle.length];
    set("sortDueDate", next);
  }

  const SortIcon =
    filters.sortDueDate === "asc"
      ? ArrowUp
      : filters.sortDueDate === "desc"
        ? ArrowDown
        : ArrowUpDown;

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 py-3">
      {/* Search */}
      <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Status */}
      <Select
        value={filters.status || "all"}
        onValueChange={(v) => set("status", v === "all" ? "" : v as TaskFilters["status"])}
      >
        <SelectTrigger className="w-36">
          <span>{filters.status ? statusLabel[filters.status] : "All statuses"}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {TASK_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority */}
      <Select
        value={filters.priority || "all"}
        onValueChange={(v) => set("priority", v === "all" ? "" : v as TaskFilters["priority"])}
      >
        <SelectTrigger className="w-36">
          <span>{filters.priority ? priorityLabel[filters.priority] : "All priorities"}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          {TASK_PRIORITIES.map((p) => (
            <SelectItem key={p} value={p}>{priorityLabel[p]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort by due date */}
      <button
        type="button"
        onClick={cycleSortDueDate}
        className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-sm transition-colors ${
          filters.sortDueDate
            ? "border-primary bg-primary/10 text-primary"
            : "border-input text-muted-foreground hover:text-foreground"
        }`}
      >
        <SortIcon className="size-3.5" />
        Due date
      </button>
    </div>
  );
}
