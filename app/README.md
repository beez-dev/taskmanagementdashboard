# Task Management Dashboard

Next.js frontend organised with a **Clean Architecture** layout. The goal is that business rules stay independent of React, Next.js, and any HTTP client — so any of those can be swapped without touching the core of the app.

## Getting Started

```bash
bun dev
# or: npm run dev / yarn dev / pnpm dev
```

Open <http://localhost:3000>.

## Architecture

Dependencies point **inward only**. Outer layers know about inner layers; inner layers know nothing about outer ones.

```
        ┌─────────────────────────────────────────────┐
        │  app/            Next.js routing shell      │  (framework convention)
        │  ─────────────────────────────────────────  │
        │  src/presentation/   React / hooks / views  │
        │  src/infrastructure/ HTTP, storage, SDKs    │
        │  ─────────────────────────────────────────  │
        │  src/application/    Use cases, ports, DTOs │
        │  ─────────────────────────────────────────  │
        │  src/domain/         Entities, value objs   │
        │  ─────────────────────────────────────────  │
        │  src/common/         Generic helpers        │
        └─────────────────────────────────────────────┘
                  ▲ imports flow this way ▲
```

### Layers

| Folder | Purpose | Docs |
|---|---|---|
| [`app/`](./app/) | Next.js App Router pages/layouts. Stays thin — composes presentation. | (framework) |
| [`src/domain/`](./src/domain/README.md) | Entities, value objects, repository interfaces, domain errors. Pure TS. | [README](./src/domain/README.md) |
| [`src/domain/common/`](./src/domain/common/README.md) | Base `Entity`, `ValueObject`, `DomainError`, shared domain primitives. | [README](./src/domain/common/README.md) |
| [`src/application/`](./src/application/README.md) | Use cases, ports, DTOs. Framework-agnostic orchestration. | [README](./src/application/README.md) |
| [`src/infrastructure/`](./src/infrastructure/README.md) | HTTP clients, storage, SDKs — implementations of interfaces from inner layers. | [README](./src/infrastructure/README.md) |
| [`src/presentation/`](./src/presentation/README.md) | React components, hooks, view models, client state. | [README](./src/presentation/README.md) |
| [`src/common/`](./src/common/README.md) | Cross-cutting language helpers (`Result`, guards). No business meaning. | [README](./src/common/README.md) |

### Why two `common/` folders?

- `src/common/` — generic language helpers (`Result<T, E>`, `assertNever`). Any layer may use them.
- `src/domain/common/` — business-meaningful base primitives (`Entity`, `ValueObject`). Only domain code uses them.

Keeping them separate stops generic helpers from bleeding domain semantics, and vice versa.

### Request flow (example: create a task)

```
<CreateTaskForm />                     ← presentation
      ↓ calls
CreateTask.execute(input)              ← application (use case)
      ↓ uses
Task entity + TaskRepository interface ← domain
      ↑ implemented by
HttpTaskRepository (fetch POST /api)   ← infrastructure
```

The presentation layer never talks to `infrastructure` directly — the concrete repository is injected at the composition edge.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
