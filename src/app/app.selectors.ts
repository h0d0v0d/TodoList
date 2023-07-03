import { RootState } from "./store";

export const selectAppError = (state: RootState) => state.app.error;
export const selectAppLoading = (state: RootState) => state.app.globalLoading;
