import type { ApiError, ApiMeta } from "@/src/common/types/api";

export class ApiHttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiHttpError";
  }
}

export function jsonOk<T>(
  data: T,
  init?: { status?: number; meta?: ApiMeta },
): Response {
  const body: { data: T; error: null; meta?: ApiMeta } = { data, error: null };
  if (init?.meta) body.meta = init.meta;
  return Response.json(body, { status: init?.status ?? 200 });
}

export function jsonError(error: ApiError, status: number): Response {
  return Response.json({ data: null, error }, { status : status ?? 500});
}

export const errors = {
  notFound: (resource: string, id: string) =>
    new ApiHttpError(404, `${resource}_not_found`, `${resource} '${id}' not found`),
  validation: (message: string, details?: Record<string, unknown>) =>
    new ApiHttpError(400, "validation_error", message, details),
  badJson: () => new ApiHttpError(400, "invalid_json", "Request body is not valid JSON"),
};
