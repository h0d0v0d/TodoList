import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const RESULT_CODE = {
  OK: 0,
  ERROR: 1,
  CAPTCHA: 10,
};

const THUNK_PREFIXES = {
  APP: "app",
} as const;

const slice = createSlice({
  name: THUNK_PREFIXES.APP,
  initialState: {
    error: null as string | null,
    globalLoading: true,
  },
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
    setAppLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.globalLoading = action.payload.loading;
    },
  },
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
      ); /* 
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/rejected");
        },
        (state, action) => {
          state.globalLoading = false;
          if (action.showGlobalError === false) return;
          state.error = action.error;
        }
      ); */
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
