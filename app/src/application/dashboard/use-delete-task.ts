"use client";

import { toast } from "sonner";
import type { ApiError } from "@/src/domain/types/api";
import type { Task } from "@/src/domain/types/task";
import { useDeleteTaskMutation } from "@/src/infrastructure/api/tasks.api";
import { baseApi } from "@/src/infrastructure/api/base-api";
import { useAppDispatch } from "@/src/application/store/hooks";

export function useDeleteTask() {
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const dispatch = useAppDispatch();

  async function handleDelete(task: Task, onSuccess: () => void) {
    try {
      await deleteTask(task.id).unwrap();
      dispatch(baseApi.util.invalidateTags([{ type: "Task" as const, id: task.status }]));
      toast.success("Task deleted");
      onSuccess();
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr?.message ?? "Failed to delete task");
    }
  }

  return { handleDelete, isDeleting };
}
