# Application Layer

Orchestration. This layer connects the presentation layer (dumb UI) to the infrastructure layer (network), and holds all shared client runtime concerns.

## What lives here

- **Feature hooks** — `useSignin`, `useSignup`, `useCreateTask`. One hook per user intent. Calls infrastructure mutations, handles navigation and toasts, returns `{ handler, isLoading }` to the component.
- **Composed feature components** — containers that own mode/routing state and render presentation components with the right props (e.g., `AuthPage`).
- **Redux store** — `store/index.ts` (configureStore), `store/hooks.ts` (typed selectors/dispatch), `store/provider.tsx` (StoreProvider wrapper).
- **App-level providers** — `providers/app-providers.tsx` combines ThemeProvider + StoreProvider + Toaster. Imported once in `app/layout.tsx`.

## What does NOT live here

- Raw network calls, `fetch`, RTK Query `createApi` — those live in [`infrastructure/`](../infrastructure/README.md).
- Dumb UI components, styles, form field state — those live in [`presentation/`](../presentation/README.md).
- Business invariants and entity types — those live in [`domain/`](../domain/README.md).

## Dependency rule

May import from: [`infrastructure/`](../infrastructure/README.md) (to call API hooks), [`presentation/`](../presentation/README.md) (to render dumb components), [`domain/`](../domain/README.md), [`common/`](../common/README.md).
May be imported by: [`app/`](../../app/) routing shell.
