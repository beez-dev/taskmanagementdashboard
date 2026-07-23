import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_FILTERS, type TaskFilters } from "@/src/presentation/components/dashboard/types";

// Filters are kept in Redux (not local state) to demonstrate that UI state
// persists across page navigations without needing a URL or server round-trip.
const filtersSlice = createSlice({
  name: "filters",
  initialState: DEFAULT_FILTERS as TaskFilters,
  reducers: {
    setFilters(_state, action: PayloadAction<TaskFilters>) {
      return action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
