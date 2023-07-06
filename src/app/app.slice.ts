import { createSlice } from "@reduxjs/toolkit";

const THUNK_PREFIXES = {
  APP: "app",
} as const;

const slice = createSlice({
  name: THUNK_PREFIXES.APP,
  initialState: {
    error: null as string | null,
    globalLoading: true,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          if (state.globalLoading === true) {
            return;
          }
          state.globalLoading = true;
        }
      )
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          if (state.globalLoading === false) {
            return;
          }
          state.globalLoading = false;
        }
      )
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/rejected");
        },
        (state, action) => {
          if (state.globalLoading === false) {
            return;
          }
          state.globalLoading = false;
        }
      );
  },
});

export const appSlice = slice.reducer;
