import type { User } from "./types";

const STORE_KEY = Symbol.for("app.mock.userStore");

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: Map<string, User>;
};

const g = globalThis as GlobalWithStore;

function seed(): Map<string, User> {
  const now = new Date().toISOString();
  const seeded: User[] = [
    {
      id: crypto.randomUUID(),
      name: "Seed User",
      email: "seed@example.com",
      password: "password123",
      dob: "1990-06-15T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
    },
  ];
  return new Map(seeded.map((u) => [u.id, u]));
}

export function userStore(): Map<string, User> {
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = seed();
  }
  return g[STORE_KEY];
}

export function findByEmail(email: string): User | undefined {
  return Array.from(userStore().values()).find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
}

export function toPublic(user: User) {
  const { password: _, ...rest } = user;
  return rest;
}
