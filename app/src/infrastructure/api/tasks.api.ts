import type { ApiError, ApiResponse } from "@/src/domain/types/api";
import type { Task, TaskStatus } from "@/src/domain/types/task";
import { baseApi } from "./base-api";

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskSummary: build.query<TaskSummary, void>({
      query: () => "/tasks/summary",
      transformResponse: (res: ApiResponse<TaskSummary>) => res.data as TaskSummary,
      transformErrorResponse: (res) => {
        const body = res.data as ApiResponse<TaskSummary>;
        return (
          body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError)
        );
      },
    }),
    listTasks: build.query<Task[], { status: TaskStatus; page?: number; pageSize?: number }>({
      query: ({ status, page = 1, pageSize = 10 }) =>
        `/tasks?status=${status}&page=${page}&pageSize=${pageSize}`,
      transformResponse: (res: ApiResponse<Task[]>) => (res.data ?? []) as Task[],
      transformErrorResponse: (res) => {
        const body = res.data as ApiResponse<Task[]>;
        return (
          body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError)
        );
      },
    }),
  }),
});

export const { useGetTaskSummaryQuery, useListTasksQuery } = tasksApi;
