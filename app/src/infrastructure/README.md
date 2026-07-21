# Infrastructure Layer

The outer ring — everything that talks to the outside world. Concrete implementations of interfaces declared by inner layers.

## What lives here

- **HTTP clients / API adapters** — `HttpTaskRepository implements TaskRepository`.
- **Storage adapters** — `LocalStorageSessionStore`, IndexedDB wrappers.
- **Third-party SDK wrappers** — auth providers, analytics, feature flags.
- **Port implementations** — `SystemClock implements Clock`, `NanoIdGenerator implements IdGenerator`.
- **Mappers** — translate between wire formats (JSON) and domain entities.

## What does NOT live here

- Business rules — belong in [`domain/`](../domain/README.md).
- Use case orchestration — belongs in [`application/`](../application/README.md).
- React components — belong in [`presentation/`](../presentation/README.md).

## Dependency rule

May import from: [`domain/`](../domain/README.md) (to implement its interfaces), [`application/`](../application/README.md) (to implement its ports), [`common/`](../common/README.md).
May be imported by: composition/wiring code only. Presentation and application must **not** import infrastructure directly — depend on the abstraction, inject the implementation.

## Guiding principle

If swapping REST for GraphQL, or `fetch` for a WebSocket subscription, would touch a file — that file lives here.
