import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserPublic } from "@/src/domain/types/user";

interface AuthState {
  user: UserPublic | null;
  isAuthenticated: boolean | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<UserPublic>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
