import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type PreferencesState = {
  theme: Theme;
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: { theme: "dark" } as PreferencesState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;
