"use client";

import { toast } from "sonner";
import type { ApiError } from "@/src/domain/types/api";
import type { Task, UpdateTaskInput } from "@/src/domain/types/task";
import { useUpdateTaskMutation } from "@/src/infrastructure/api/tasks.api";
import { baseApi } from "@/src/infrastructure/api/base-api";
import { useAppDispatch } from "@/src/application/store/hooks";

export function useUpdateTask() {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  async function handleUpdate(task: Task, updates: UpdateTaskInput, onSuccess: () => void) {
    try {
      await updateTask({ id: task.id, updates }).unwrap();
      toast.success("Task updated");

      const affectedStatuses = new Set([task.status]);
      if (updates.status && updates.status !== task.status) affectedStatuses.add(updates.status);
      dispatch(
        baseApi.util.invalidateTags(
          [...affectedStatuses].map((s) => ({ type: "Task" as const, id: s })),
        ),
      );

      onSuccess();
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr?.message ?? "Failed to update task");
    }
  }

  return { handleUpdate, isLoading };
}
