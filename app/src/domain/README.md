# Domain Layer

Enterprise-wide business rules. The innermost layer — nothing here knows about React, Next.js, HTTP, or storage. If the app were rewritten as a CLI tomorrow, this folder would not change.

## What lives here

- **Entities** — objects with identity and a lifecycle (`Task`, `Board`, `User`).
- **Value objects** — immutable, identity-less data with invariants (`TaskId`, `Email`, `DateRange`).
- **Domain events** — things that happened in the business (`TaskCompleted`).
- **Domain errors** — rule violations (`TaskAlreadyCompletedError`).
- **Repository interfaces** — contracts like `TaskRepository`. Implementations live in `infrastructure/`.

## What does NOT live here

- React components, hooks, `useState`, JSX.
- `fetch`, `axios`, HTTP calls, SQL.
- Framework imports (Next.js, React, etc.).
- Use case orchestration — that's `application/`.
