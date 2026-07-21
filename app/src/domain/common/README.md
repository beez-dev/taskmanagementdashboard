# Domain / Common

Shared building blocks used *within the domain layer only*. If a type is only meaningful to domain code, it goes here — not in the top-level [`src/common/`](../../common/README.md).

## What lives here

- **Base classes** — `Entity<TId>`, `AggregateRoot<TId>`, `ValueObject<TProps>`.
- **Base domain error** — `DomainError` that all specific domain errors extend.
- **Domain-wide value objects** — reused across multiple aggregates (e.g., `Timestamp`, `Slug`).
- **Domain event base** — `DomainEvent` and any dispatch contract.

