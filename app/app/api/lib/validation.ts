import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type CreateTaskInput,
  type Task,
  type TaskPriority,
  type TaskStatus,
  type UpdateTaskInput,
} from "@/src/common/types/task";
import { errors } from "./response";

const TITLE_MAX = 200;
const DESC_MAX = 2000;

const isString = (v: unknown): v is string => typeof v === "string";
const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function requireString(value: unknown, field: string, max: number): string {
  if (!isString(value) || value.trim().length === 0) {
    throw errors.validation(`Field '${field}' is required`, { field });
  }
  if (value.length > max) {
    throw errors.validation(`Field '${field}' exceeds ${max} characters`, { field });
  }
  return value.trim();
}

function optionalString(value: unknown, field: string, max: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (!isString(value)) {
    throw errors.validation(`Field '${field}' must be a string`, { field });
  }
  if (value.length > max) {
    throw errors.validation(`Field '${field}' exceeds ${max} characters`, { field });
  }
  return value.trim();
}

function requireEnum<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[],
): T {
  if (!isString(value) || !allowed.includes(value as T)) {
    throw errors.validation(
      `Field '${field}' must be one of: ${allowed.join(", ")}`,
      { field, allowed },
    );
  }
  return value as T;
}

function optionalEnum<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[],
): T | undefined {
  if (value === undefined || value === null) return undefined;
  return requireEnum(value, field, allowed);
}

function requireIsoDate(value: unknown, field: string): string {
  if (!isString(value)) {
    throw errors.validation(`Field '${field}' is required`, { field });
  }
  const t = Date.parse(value);
  if (Number.isNaN(t)) {
    throw errors.validation(`Field '${field}' is not a valid ISO date`, { field });
  }
  return new Date(t).toISOString();
}

function optionalIsoDate(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  return requireIsoDate(value, field);
}

export function parseCreateInput(body: unknown): Required<CreateTaskInput> {
  if (!isObject(body)) {
    throw errors.validation("Request body must be a JSON object");
  }
  return {
    title: requireString(body.title, "title", TITLE_MAX),
    description: optionalString(body.description, "description", DESC_MAX) ?? "",
    status: (optionalEnum<TaskStatus>(body.status, "status", TASK_STATUSES) ?? "todo"),
    priority:
      optionalEnum<TaskPriority>(body.priority, "priority", TASK_PRIORITIES) ?? "medium",
    dueDate: requireIsoDate(body.dueDate, "dueDate"),
  };
}

export function parseUpdateInput(body: unknown): UpdateTaskInput {
  if (!isObject(body)) {
    throw errors.validation("Request body must be a JSON object");
  }
  const patch: UpdateTaskInput = {};
  if ("title" in body) patch.title = requireString(body.title, "title", TITLE_MAX);
  if ("description" in body)
    patch.description = optionalString(body.description, "description", DESC_MAX) ?? "";
  if ("status" in body)
    patch.status = requireEnum<TaskStatus>(body.status, "status", TASK_STATUSES);
  if ("priority" in body)
    patch.priority = requireEnum<TaskPriority>(body.priority, "priority", TASK_PRIORITIES);
  if ("dueDate" in body) patch.dueDate = optionalIsoDate(body.dueDate, "dueDate");
  if (Object.keys(patch).length === 0) {
    throw errors.validation("Request body must include at least one updatable field");
  }
  return patch;
}

export interface ListParams {
  q?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  page: number;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export function parseListParams(sp: URLSearchParams): ListParams {
  const rawStatus = sp.get("status");
  const rawPriority = sp.get("priority");
  const rawPage = sp.get("page");
  const rawSize = sp.get("pageSize");

  const status = rawStatus ? requireEnum<TaskStatus>(rawStatus, "status", TASK_STATUSES) : undefined;
  const priority = rawPriority
    ? requireEnum<TaskPriority>(rawPriority, "priority", TASK_PRIORITIES)
    : undefined;

  const page = rawPage ? Math.max(1, Number.parseInt(rawPage, 10) || 1) : 1;
  const requestedSize = rawSize
    ? Math.max(1, Number.parseInt(rawSize, 10) || DEFAULT_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE;
  const pageSize = Math.min(requestedSize, MAX_PAGE_SIZE);

  const q = sp.get("q")?.trim() || undefined;

  return { q, status, priority, page, pageSize };
}

export function buildTask(input: Required<CreateTaskInput>): Task {
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
