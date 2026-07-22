import { handle, readJson } from "@/app/api/lib/handler";
import { errors, jsonOk } from "@/app/api/lib/response";
import { taskStore } from "@/app/api/lib/store";
import { parseUpdateInput } from "@/app/api/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  const task = taskStore().get(id);
  if (!task) throw errors.notFound("task", id);
  return jsonOk(task);
});

export const PATCH = handle<Ctx>(async (req, { params }) => {
  const { id } = await params;
  const body = await readJson(req);
  const patch = parseUpdateInput(body);

  const store = taskStore();
  const existing = store.get(id);
  if (!existing) throw errors.notFound("task", id);

  const updated = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  store.set(id, updated);
  return jsonOk(updated);
});

export const DELETE = handle<Ctx>(async (_req, { params }) => {
  const { id } = await params;
  const store = taskStore();
  if (!store.has(id)) throw errors.notFound("task", id);
  store.delete(id);
  return jsonOk({ id });
});
