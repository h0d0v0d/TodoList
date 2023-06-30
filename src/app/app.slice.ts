import { createSlice } from "@reduxjs/toolkit";

const THUNK_PREFIXES = {
  APP: "app",
} as const;

const slice = createSlice({
  name: THUNK_PREFIXES.APP,
  initialState: {
    error: null as string | null,
    globalLoading: false,
  },
  reducers: {},
  extraReducers(builder) {},
});

export const appSlice = slice.reducer;
