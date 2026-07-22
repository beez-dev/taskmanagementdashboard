import { z } from "zod";

// ─── Enum constants (kept as const arrays so barrels/tests can iterate them) ─

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

// ─── Schemas ─────────────────────────────────────────────────────────────────

export const taskStatusSchema = z.enum(TASK_STATUSES);
export const taskPrioritySchema = z.enum(TASK_PRIORITIES);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or fewer")
    .transform((v) => v.trim()),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or fewer")
    .optional()
    .default(""),
  status: taskStatusSchema.optional().default("todo"),
  priority: taskPrioritySchema.optional().default("medium"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Must be a valid date")
    .transform((v) => new Date(v).toISOString()),
});

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be 200 characters or fewer")
      .transform((v) => v.trim())
      .optional(),
    description: z
      .string()
      .max(2000, "Description must be 2000 characters or fewer")
      .optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    dueDate: z
      .string()
      .refine((v) => !Number.isNaN(Date.parse(v)), "Must be a valid date")
      .transform((v) => new Date(v).toISOString())
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Request body must include at least one updatable field",
  );

// ─── Types ───────────────────────────────────────────────────────────────────

export type TaskId = string;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskPriority = z.infer<typeof taskPrioritySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export interface Task {
  id: TaskId;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
