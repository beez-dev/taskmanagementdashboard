"use client";

import { useReducer } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Task, TaskPriority, TaskStatus } from "@/src/domain/types/task";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/src/domain/types/task";
import { useUpdateTask } from "@/src/application/dashboard/use-update-task";

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  pending: "Pending",
  testing: "Testing",
  completed: "Completed",
};

const priorityLabel = Object.fromEntries(
  TASK_PRIORITIES.map((p) => [p, p.charAt(0).toUpperCase() + p.slice(1)]),
) as Record<TaskPriority, string>;

interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
}

type FormState = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

type FormAction = { [K in keyof FormState]: { field: K; value: FormState[K] } }[keyof FormState];

function formReducer(state: FormState, action: FormAction): FormState {
  return { ...state, [action.field]: action.value };
}

export function TaskEditModal({ task, onClose }: TaskEditModalProps) {
  const { handleUpdate, isLoading } = useUpdateTask();
  const [form, dispatch] = useReducer(formReducer, {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate.split("T")[0],
  });

  const fieldClass =
    "w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:border-primary";
  const labelClass = "text-xs font-medium text-muted-foreground";

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Centring wrapper — pointer-events-none so clicks outside the card hit the backdrop */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          layoutId={`task-card-${task.id}`}
          className="pointer-events-auto w-full max-w-lg rounded-xl bg-card p-6 shadow-xl"
          transition={{ duration: 0.3, ease: "easeInOut" as const }}
          tabIndex={-1}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold">Edit Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => dispatch({ field: "title", value: e.target.value })}
                className={fieldClass}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => dispatch({ field: "description", value: e.target.value })}
                rows={3}
                className={`${fieldClass} resize-none`}
              />
            </div>

            {/* Status + Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    dispatch({ field: "status", value: e.target.value as TaskStatus })
                  }
                  className={fieldClass}
                >
                  {TASK_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    dispatch({ field: "priority", value: e.target.value as TaskPriority })
                  }
                  className={fieldClass}
                >
                  {TASK_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {priorityLabel[p]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => dispatch({ field: "dueDate", value: e.target.value })}
                className={fieldClass}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleUpdate(task, form, onClose)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Saving…" : "Save"}
            </button>
          </div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
}
