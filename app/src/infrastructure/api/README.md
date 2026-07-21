# Infrastructure / API (RTK Query)

Concrete network layer — every request to the backend goes through code in this folder. Uses RTK Query so caching, invalidation, and hooks are generated for free.

## What lives here

- `base-api.ts` — the root `createApi` instance with `fetchBaseQuery` (base URL, auth headers, error normalisation).
- `<feature>.api.ts` — endpoint definitions per feature (`tasks.api.ts`, `boards.api.ts`).
- `mappers/` — translate wire DTOs into domain-shaped view models before the app sees them.
- `error.ts` — normalise API errors into the app's `AppError` hierarchy.

## What does NOT live here

- Redux store setup — that's [`src/presentation/store/`](../../presentation/store/README.md). The generated reducer and middleware are exported from here and *registered* there.
- Business rules — [`src/domain/`](../../domain/README.md).
- React hook usage — components import the RTK-generated hooks (e.g., `useGetTasksQuery`) at the presentation layer.

## Dependency rule

May import from: [`src/domain/`](../../domain/README.md) (for types + repo interfaces it implements), [`src/application/`](../../application/README.md) (for ports it implements), [`src/common/`](../../common/README.md).
May be imported by: [`src/presentation/store/`](../../presentation/store/README.md) (for reducer/middleware wiring) and any presentation component that uses the generated hooks.

## Why RTK Query lives in infrastructure

RTK Query is an HTTP client + cache — same category as `axios` or a custom `fetch` wrapper. The fact that it happens to produce React hooks doesn't make it presentation code; it's a network adapter that happens to publish a hook-shaped API.
