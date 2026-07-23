import { handle, readJson } from "@/app/api/lib/handler";
import { jsonOk } from "@/app/api/lib/response";
import { taskStore } from "@/app/api/lib/store";
import {
  buildTask,
  parseCreateInput,
  parseListParams,
} from "@/app/api/lib/validation";

export const GET = handle(async (req) => {
  const params = parseListParams(req.nextUrl.searchParams);
  const all = Array.from(taskStore().values()).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  const filtered = all.filter((t) => {
    if (params.status && t.status !== params.status) return false;
    if (params.priority && t.priority !== params.priority) return false;
    if (params.q) {
      const needle = params.q.toLowerCase();
      const hay = `${t.title} ${t.description}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  const page = filtered.slice(start, start + params.pageSize);

  return jsonOk(page, {
    meta: { total, page: params.page, pageSize: params.pageSize },
  });
});

export const POST = handle(async (req) => {
  const body = await readJson(req);
  const input = parseCreateInput(body);
  const task = buildTask(input);
  taskStore().set(task.id, task);
  return jsonOk(task, { status: 201 });
});
