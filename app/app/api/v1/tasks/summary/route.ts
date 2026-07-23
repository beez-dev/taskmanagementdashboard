import { handle } from "@/app/api/lib/handler";
import { jsonOk } from "@/app/api/lib/response";
import { taskStore } from "@/app/api/lib/store";

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export const GET = handle(async () => {
  const all = [...taskStore().values()];
  const summary: TaskSummary = {
    total:        all.length,
    completed:    all.filter((t) => t.status === "done").length,
    pending:      all.filter((t) => t.status !== "done").length,
    highPriority: all.filter((t) => t.priority === "high").length,
  };
  return jsonOk(summary);
});
