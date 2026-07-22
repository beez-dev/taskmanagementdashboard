import type { NextRequest } from "next/server";
import { ApiHttpError, errors, jsonError } from "./response";

type RouteHandler<Ctx> = (req: NextRequest, ctx: Ctx) => Promise<Response>;

export function handle<Ctx>(fn: RouteHandler<Ctx>): RouteHandler<Ctx> {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      if (err instanceof ApiHttpError) {
        return jsonError(
          { code: err.code, message: err.message, details: err.details },
          err.status,
        );
      }
      console.error("[api] unhandled error", err);
      return jsonError(
        { code: "internal_error", message: "Unexpected server error" },
        500,
      );
    }
  };
}

export async function readJson(req: NextRequest): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw errors.badJson();
  }
}
