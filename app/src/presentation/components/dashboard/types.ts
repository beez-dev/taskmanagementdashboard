import type { TaskPriority, TaskStatus } from "@/src/domain/types/task";

export type TaskFilters = {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  sortDueDate: "asc" | "desc" | "";
};

export const DEFAULT_FILTERS: TaskFilters = {
  search: "",
  status: "",
  priority: "",
  sortDueDate: "",
};
