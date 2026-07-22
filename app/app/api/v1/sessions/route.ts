import { handle, readJson } from "@/app/api/lib/handler";
import { errors, jsonOk } from "@/app/api/lib/response";
import { findByEmail, toPublic } from "@/app/api/lib/user-store";
import { parseSigninInput } from "@/app/api/lib/user-validation";

export const POST = handle(async (req) => {
  const body = await readJson(req);
  const input = parseSigninInput(body);

  const user = findByEmail(input.email);
  if (!user || user.password !== input.password) {
    throw errors.unauthorized("Invalid email or password");
  }

  return jsonOk(toPublic(user));
});
