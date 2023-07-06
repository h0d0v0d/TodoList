import { RootState } from "./store";

export const appSelectors = {
  error: (state: RootState) => state.app.error,
  loading: (state: RootState) => state.app.globalLoading,
};
