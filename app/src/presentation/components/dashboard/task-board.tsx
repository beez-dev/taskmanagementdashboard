import { TASK_STATUSES } from "@/src/domain/types/task";
import { TaskColumn } from "./task-column";

export function TaskBoard() {
  return (
    <div className="flex h-full gap-3 overflow-x-auto pb-4">
      {TASK_STATUSES.map((status) => (
        <TaskColumn key={status} status={status} />
      ))}
    </div>
  );
}
