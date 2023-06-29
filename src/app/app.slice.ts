import { createSlice } from "@reduxjs/toolkit";

enum THUNK_PREFIXES {
  APP = "app",
}

const slice = createSlice({
  name: THUNK_PREFIXES.APP,
  initialState: {
    globalLoading: true,
  },
  reducers: {},
  extraReducers(builder) {},
});

export const appSlice = slice.reducer;
