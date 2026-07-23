import type { ApiError, ApiResponse } from "@/src/domain/types/api";
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
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
  }),
});

export const { useGetTaskSummaryQuery } = tasksApi;
