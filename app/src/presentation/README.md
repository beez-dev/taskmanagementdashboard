# Presentation Layer

Everything React and Next.js. This layer decides *how* things are shown; it does not decide *what* the system does.

## What lives here

- **Components** — reusable UI (`TaskCard`, `BoardColumn`, `PrimaryButton`).
- **View-specific hooks** — `useTaskListPage`, `useCreateTaskForm`.
- **View models / presenters** — reshape use-case output for a specific view.
- **Client state** — Zustand/Redux/context stores that hold UI state.
- **Form state and UI validation** — the schema/messages a form shows.
- **Styles** — Tailwind classes, CSS modules, styled-components.

## Relationship to the Next.js `app/` folder

The [`app/`](../../app/) directory at the repo root is Next.js routing — it stays there (framework convention, can't be renamed). It should be **thin**: each `page.tsx` / `layout.tsx` composes components imported from here.

```
app/tasks/page.tsx  →  presentation/pages/TasksPage  →  useCases from application/
```

## What does NOT live here

- Business rules — [`domain/`](../domain/README.md).
- Use case orchestration — [`application/`](../application/README.md).
- `fetch` calls or SDK instantiation — [`infrastructure/`](../infrastructure/README.md).

## Dependency rule

May import from: [`application/`](../application/README.md) (to invoke use cases), [`domain/`](../domain/README.md) (read-only for types), [`common/`](../common/README.md).
May be imported by: [`app/`](../../app/) routing shell only.
May NOT import: [`infrastructure/`](../infrastructure/README.md) directly — receive dependencies via context/props/composition.
