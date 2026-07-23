# Task Management Dashboard

A full-featured task management kanban board built with Next.js, React 19, and TypeScript. Organised with Clean Architecture so business rules stay independent of React, Next.js, and any HTTP client.

## Features

### Task Board
- **Kanban columns** — four status columns: To Do, Pending, Testing, Completed
- **Task cards** — show title, description excerpt, colour-coded priority (High / Medium / Low), and due date
- **Edit modal** — click any card to open a form to edit title, description, status, priority, and due date; animated with Framer Motion
- **Delete** — delete button inside the edit modal; updates the column immediately via RTK Query cache invalidation
- **200 seeded tasks** — in-memory mock store, evenly distributed across all four statuses

### Search & Filters
- **Search by title** — real-time client-side filter across the visible column(s)
- **Filter by status** — hides non-matching columns on desktop; switches the active tab on mobile
- **Filter by priority** — narrows cards within each column
- **Sort by due date** — cycles through none → ascending → descending
- Filter state is stored in **Redux** (not component state) to demonstrate UI state that survives page navigations without a URL parameter or server round-trip

### Authentication
- Sign-in and sign-up forms with **Zod validation** and per-field error messages
- **Enter key** submits both forms
- Auth state is **persisted via Redux Persist** so users stay logged in across page refreshes

### Navigation & Layout
- **Top navbar** — Dashboard title on the left; Log out and Settings gear on the right
- **Settings drawer** — slides in from the right using Framer Motion; contains a Light / Dark theme toggle
- **Theme** — persisted to `localStorage` via Redux Persist; applies the `.dark` CSS class to `<html>` through a `ThemeSync` component; no `next-themes` dependency
- **Page transition** — auth page animates out (fade + scale up) before navigating; dashboard animates in (fade + slide up)
- **Mobile layout** — summary cards in a 2×2 grid, task board as a tabbed single-column view; filter bar wraps naturally
- **Desktop layout** — four side-by-side scrollable columns

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI primitives | Base UI + shadcn/ui (at `components/ui/`) |
| Server state | RTK Query (part of Redux Toolkit) |
| Client state | Redux Toolkit + Redux Persist |
| Animations | Framer Motion (`motion/react` v12) |
| Validation | Zod v4 |
| Toasts | Sonner |
| Icons | Lucide React |

## Getting Started

```bash
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open <http://localhost:3000>. Register a new account or sign in with any existing one.

## Project Structure

```
app/                        Next.js App Router pages and route handlers
  (auth)/page.tsx           Sign-in / sign-up page
  (protected)/dashboard/    Dashboard page (behind AuthGuard)
  api/v1/                   Mock REST API route handlers
    tasks/                  GET list, POST create
    tasks/[id]/             GET, PATCH, DELETE
    tasks/summary/          Aggregate counts
    sessions/               POST sign-in
    users/                  POST sign-up

src/
  domain/                   Entities, types, Zod schemas — pure TS, zero framework deps
  application/              Feature hooks, Redux store, app-level providers
    store/
      slices/
        auth.slice.ts       Authenticated user (persisted)
        preferences.slice.ts Theme preference (persisted)
        filters.slice.ts    Task filter state (in-memory Redux, not persisted)
  infrastructure/
    api/
      base-api.ts           RTK Query base with /api/v1 baseUrl
      tasks.api.ts          listTasks, updateTask, deleteTask, getTaskSummary
      auth.api.ts           signin, signup mutations
  presentation/
    components/
      auth/                 LoginForm, SignupForm
      dashboard/            TaskBoard, TaskColumn, TaskCard, TaskFiltersBar, TaskEditModal
      layout/               Navbar, SettingsDrawer
      ui/                   AppCard, AppButton, AppInput — thin wrappers over shadcn primitives

components/ui/              shadcn-managed UI primitives (CLI default location, not moved)
```

## Architecture

Dependencies point **inward only**. Outer layers know about inner layers; inner layers know nothing about outer ones.

```
        ┌─────────────────────────────────────────────┐
        │  app/            Next.js routing shell      │
        │  ─────────────────────────────────────────  │
        │  src/presentation/   React components       │
        │  src/infrastructure/ RTK Query, API clients │
        │  ─────────────────────────────────────────  │
        │  src/application/    Hooks, store, providers│
        │  ─────────────────────────────────────────  │
        │  src/domain/         Types, schemas, errors │
        └─────────────────────────────────────────────┘
                  ▲ imports flow this way ▲
```

See the per-layer READMEs for what belongs in each folder.

## Redux Store

| Slice | Persisted | Purpose |
|---|---|---|
| `auth` | Yes (`localStorage`) | `isAuthenticated`, `user` object |
| `preferences` | Yes (`localStorage`) | `theme: "light" \| "dark"` |
| `filters` | No (in-memory) | Task search, status, priority, sort — resets on hard refresh intentionally |
| `api` (RTK Query) | No | Server state cache for tasks and summary |

## API

All endpoints follow `/api/v1/<resource>` and share one response envelope:

```json
{
  "data": <T> | null,
  "error": { "code": "string", "message": "string" } | null,
  "meta"?: { "total": number, "page": number, "pageSize": number }
}
```

| Method | URL | Description |
|---|---|---|
| `POST` | `/api/v1/sessions` | Sign in — returns user object |
| `POST` | `/api/v1/users` | Sign up — creates account |
| `GET` | `/api/v1/tasks` | List tasks (`status`, `q`, `priority`, `page`, `pageSize`) |
| `POST` | `/api/v1/tasks` | Create a task |
| `GET` | `/api/v1/tasks/summary` | Aggregate counts (total, completed, pending, highPriority) |
| `GET` | `/api/v1/tasks/:id` | Get single task |
| `PATCH` | `/api/v1/tasks/:id` | Partial update (at least one field required) |
| `DELETE` | `/api/v1/tasks/:id` | Delete — returns `{ id }` |

The mock store seeds **200 tasks** on first request and lives in `globalThis` for the lifetime of the Next.js server process. Restarting the dev server resets all data.

## Layout Decisions

### shadcn components stay at repo-root defaults
Generated UI primitives live in `components/ui/` — the shadcn CLI default. Moving them would break every future `npx shadcn add …` command. Treat `components/ui/` as an in-repo UI library; only `src/presentation/` imports from it.

The `cn` helper is redirected to `src/common/utils.ts` via `components.json` so it fits the clean-arch tree without a stray repo-root `lib/` folder.

### RTK Query lives in `infrastructure/`, store in `application/`
RTK Query is a network client — the same category as `fetch` or `axios`. The fact that it produces React hooks is an API-shape convenience. Keeping the `createApi` definition in `infrastructure/` means swapping the HTTP layer is a localised change. `application/store/index.ts` registers the generated reducer and middleware; components import the generated hooks from `infrastructure/api/`.

### Filters in Redux, not `useState`
`src/application/store/slices/filters.slice.ts` holds task filter state in Redux rather than component-local state. This is intentional — it demonstrates how Redux can keep UI state alive across page navigations without URL parameters or server round-trips. The slice is deliberately **not** persisted so filters reset on hard refresh.
