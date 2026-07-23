"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/application/store/hooks";
import { clearUser } from "@/src/application/store/slices/auth.slice";
import { persistor } from "@/src/application/store";

export function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(clearUser());
    persistor.purge();
    router.replace("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
    >
      Log out
    </button>
  );
}
