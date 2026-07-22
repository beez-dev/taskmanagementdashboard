export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMeta {
  total?: number;
  page?: number;
  pageSize?: number;
}

export type ApiResponse<T> =
  | { data: T; error: null; meta?: ApiMeta }
  | { data: null; error: ApiError };
