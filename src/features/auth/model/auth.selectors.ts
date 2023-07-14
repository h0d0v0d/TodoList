import { RootState } from "../../../app/store";

export const authSelectors = {
  isLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  user: (state: RootState) => state.auth.user,
};
