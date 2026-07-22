import { handle, readJson } from "@/app/api/lib/handler";
import { errors, jsonOk } from "@/app/api/lib/response";
import { findByEmail, toPublic, userStore } from "@/app/api/lib/user-store";
import { buildUser, parseSignupInput } from "@/app/api/lib/user-validation";

export const POST = handle(async (req) => {
  const body = await readJson(req);
  const input = parseSignupInput(body);

  if (findByEmail(input.email)) {
    throw errors.conflict(`An account with email '${input.email}' already exists`);
  }

  const user = buildUser(input);
  userStore().set(user.id, user);

  return jsonOk(toPublic(user), { status: 201 });
});
