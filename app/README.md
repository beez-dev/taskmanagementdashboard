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
| [`src/presentation/store/`](./src/presentation/store/README.md) | Redux store, slices, `<StoreProvider>`, redux-persist config. | [README](./src/presentation/store/README.md) |
| [`src/infrastructure/api/`](./src/infrastructure/api/README.md) | RTK Query base API + endpoint definitions. Wire-format mappers. | [README](./src/infrastructure/api/README.md) |
| [`src/common/`](./src/common/README.md) | Cross-cutting language helpers (`Result`, guards). No business meaning. | [README](./src/common/README.md) |
| [`components/`](./components/) | **shadcn-managed** UI primitives. Kept at repo root by design (see [Layout decisions](#layout-decisions)). | — |

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

## Layout decisions

Two deliberate exceptions to the pure clean-architecture layout. Both are documented here so nobody "corrects" them later.

### shadcn/ui components stay at repo-root defaults

Generated UI primitives live in [`components/ui/`](./components/) — the shadcn CLI default, **not** under `src/presentation/`.

**Why:** the `components` path is baked into [`components.json`](./components.json) and referenced by every future `bunx shadcn@latest add …` command. Relocating generated files (or diverging from the community registry) means fighting the CLI on every install and upgrade. The maintenance cost outweighs the benefit of layer purity for a set of pure-visual, framework-generated primitives.

**How to treat them:** think of `components/ui/` as an *external UI library that happens to live in-repo* — same status as an npm package. Presentation components in `src/presentation/` import from it freely; nothing else should.

**Exception — the `cn` helper.** The `utils`/`lib` aliases in [`components.json`](./components.json) are redirected to [`src/common/utils.ts`](./src/common/utils.ts) instead of a repo-root `lib/`. `cn` is a generic language-level helper (just `clsx` + `tailwind-merge`) that fits `src/common/` naturally; keeping it there avoids a one-file `lib/` folder living outside the clean-arch tree. Because we changed the alias (not the generated code), future `shadcn add` commands emit the correct import automatically.

### Redux is split by concern (RTK Query in `infrastructure/`, store in `presentation/`)

- [`src/presentation/store/`](./src/presentation/store/README.md) — `configureStore`, slices, `<StoreProvider>`, `PersistGate`, redux-persist config. This is UI state and lifecycle wiring.
- [`src/infrastructure/api/`](./src/infrastructure/api/README.md) — `createApi` base + endpoint definitions (`tasks.api.ts`, etc.). This is the HTTP client.

**Why:** RTK Query is a network client with caching — the same category as `axios` or a `fetch` wrapper. The fact that it produces React hooks is an API-shape convenience, not evidence that it belongs in presentation. Splitting it out means:
- The base URL, auth headers, and error normalisation live next to other infrastructure adapters.
- Swapping RTK Query for a different client (or adding a second one for websockets) is a localised change.
- Slice logic (pure UI state) doesn't get mixed in with network configuration.

**How the two connect:** [`presentation/store/index.ts`](./src/presentation/store/README.md) imports the generated `reducer` and `middleware` from each API in `infrastructure/api/` and registers them with `configureStore`. Components import the generated hooks (`useGetTasksQuery`, etc.) directly from `infrastructure/api/`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
