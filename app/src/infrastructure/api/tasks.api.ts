import type { ApiError, ApiMeta, ApiResponse } from "@/src/domain/types/api";
import type { Task, TaskStatus, UpdateTaskInput } from "@/src/domain/types/task";
import { baseApi } from "./base-api";

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export interface TaskPage {
  tasks: Task[];
  total: number;
}

const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskSummary: build.query<TaskSummary, void>({
      query: () => "/tasks/summary",
      providesTags: ["TaskSummary"],
      transformResponse: (res: ApiResponse<TaskSummary>) => res.data as TaskSummary,
      transformErrorResponse: (res) => {
        const body = res.data as ApiResponse<TaskSummary>;
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
    listTasks: build.query<TaskPage, { status: TaskStatus; page?: number; pageSize?: number }>({
      query: ({ status, page = 1, pageSize = 10 }) =>
        `/tasks?status=${status}&page=${page}&pageSize=${pageSize}`,
      providesTags: (_result, _err, { status }) => [{ type: "Task" as const, id: status }],
      transformResponse: (res: ApiResponse<Task[]>) => ({
        tasks: (res.data ?? []) as Task[],
        total: (res as { data: Task[]; error: null; meta?: ApiMeta }).meta?.total ?? 0,
      }),
      transformErrorResponse: (res) => {
        const body = res.data as ApiResponse<Task[]>;
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
    updateTask: build.mutation<Task, { id: string; updates: UpdateTaskInput }>({
      query: ({ id, updates }) => ({ url: `/tasks/${id}`, method: "PATCH", body: updates }),
      invalidatesTags: ["TaskSummary"],
      transformResponse: (res: ApiResponse<Task>) => res.data as Task,
      transformErrorResponse: (res) => {
        const body = res.data as ApiResponse<Task>;
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
  }),
});

export const { useGetTaskSummaryQuery, useListTasksQuery, useUpdateTaskMutation } = tasksApi;
