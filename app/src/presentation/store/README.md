# Presentation / Store (Redux)

Client-side UI state. Anything that only the browser needs to know about — theme, sidebar open/closed, current filter selection, in-flight form state.

## What lives here

- `index.ts` — `configureStore`, `persistor`, typed `RootState` and `AppDispatch`.
- `hooks.ts` — typed `useAppDispatch`, `useAppSelector`.
- `provider.tsx` — `<StoreProvider>` client component that wraps the app with `<Provider>` + `<PersistGate>`.
- `slices/` — one file per feature slice (`ui.slice.ts`, `auth.slice.ts`, ...).
- `persist.ts` — redux-persist config (which slices persist, storage engine, version/migrations).

## What does NOT live here

- **RTK Query APIs** — those live in [`src/infrastructure/api/`](../../infrastructure/api/README.md). The generated reducer is registered in this store's `reducer` map, but the endpoint definitions are infra.
- Business rules, domain entities — [`src/domain/`](../../domain/README.md).
- Use case orchestration — [`src/application/`](../../application/README.md).

## Dependency rule

May import from: [`src/infrastructure/api/`](../../infrastructure/api/README.md) (to plug reducer + middleware), [`src/common/`](../../common/README.md).
May be imported by: [`src/presentation/`](../README.md) and [`app/`](../../../app/) routing.
