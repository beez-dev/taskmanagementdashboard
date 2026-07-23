"use client";

import { useGetTaskSummaryQuery } from "@/src/infrastructure/api/tasks.api";

export function useDashboardSummary() {
  return useGetTaskSummaryQuery();
}
