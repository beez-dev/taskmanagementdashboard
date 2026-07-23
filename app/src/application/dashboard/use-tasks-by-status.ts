"use client";

import type { TaskStatus } from "@/src/domain/types/task";
import { useListTasksQuery } from "@/src/infrastructure/api/tasks.api";

export function useTasksByStatus(status: TaskStatus, page?: number, pageSize?: number) {
  return useListTasksQuery({ status, page, pageSize });
}
