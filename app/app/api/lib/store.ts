import type { Task } from "@/src/common/types/task";

const STORE_KEY = Symbol.for("app.mock.taskStore");

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: Map<string, Task>;
};

const g = globalThis as GlobalWithStore;

function seed(): Map<string, Task> {
  const now = new Date();
  const iso = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString();
  };

  const seeded: Task[] = [
    {
      id: crypto.randomUUID(),
      title: "Draft Q3 roadmap",
      description: "Collect priorities from each squad lead and consolidate.",
      status: "in_progress",
      priority: "high",
      dueDate: iso(3),
      createdAt: iso(-2),
      updatedAt: iso(-1),
    },
    {
      id: crypto.randomUUID(),
      title: "Ship task dashboard v1",
      description: "CRUD + list filters. Feedback session with design on Friday.",
      status: "todo",
      priority: "medium",
      dueDate: iso(10),
      createdAt: iso(-1),
      updatedAt: iso(-1),
    },
    {
      id: crypto.randomUUID(),
      title: "Migrate legacy auth",
      description: "Remove custom middleware; adopt shared SDK.",
      status: "done",
      priority: "low",
      dueDate: iso(-5),
      createdAt: iso(-14),
      updatedAt: iso(-4),
    },
  ];

  return new Map(seeded.map((t) => [t.id, t]));
}

export function taskStore(): Map<string, Task> {
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = seed();
  }

  return g[STORE_KEY];
}
