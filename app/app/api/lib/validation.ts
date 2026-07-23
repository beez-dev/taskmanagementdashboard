import { z } from "zod";
import {
  createTaskSchema,
  taskPrioritySchema,
  taskStatusSchema,
  updateTaskSchema,
  type Task,
} from "./types";
import { zodToApiError } from "./response";

const listTasksSchema = z.object({
  q: z.string().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  // URLSearchParams values are strings — coerce to number, silently default on bad input
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).catch(20),
});

export type ListParams = z.infer<typeof listTasksSchema>;

export function parseCreateInput(body: unknown) {
  const result = createTaskSchema.safeParse(body);
  if (!result.success) throw zodToApiError(result.error);
  return result.data;
}

export function parseUpdateInput(body: unknown) {
  const result = updateTaskSchema.safeParse(body);
  if (!result.success) throw zodToApiError(result.error);
  return result.data;
}

export function parseListParams(sp: URLSearchParams): ListParams {
  const result = listTasksSchema.safeParse({
    q: sp.get("q") ?? undefined,
    status: sp.get("status") ?? undefined,
    priority: sp.get("priority") ?? undefined,
    page: sp.get("page") ?? undefined,
    pageSize: sp.get("pageSize") ?? undefined,
  });
  if (!result.success) throw zodToApiError(result.error);
  return result.data;
}

export function buildTask(input: z.infer<typeof createTaskSchema>): Task {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    status: input.status,
    priority: input.priority,
    dueDate: input.dueDate,
    createdAt: now,
    updatedAt: now,
  };
}
