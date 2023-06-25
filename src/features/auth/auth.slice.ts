import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginArgs, authAPI } from "./auth.api";
import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";

enum THUNK_PREFIXES {
  AUTH = "auth",
  ME = "auth/me",
  LOGIN = "auth/login",
}

type MePayload = { isLoggedIn: boolean; user: any };
const me = createAppAsyncThunk<MePayload, {}>(
  THUNK_PREFIXES.ME,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await authAPI.me();
      return { isLoggedIn: true, user: res.data };
    });
  }
);

type LoginPayload = { isLoggedIn: boolean; userId: number };
const login = createAppAsyncThunk<LoginPayload, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await authAPI.login({
        email: args.email,
        password: args.password,
      });
      console.log(res);
      return { isLoggedIn: true, userId: res.data.data.userId };
    });
  }
);

const slice = createSlice({
  name: THUNK_PREFIXES.AUTH,
  initialState: {
    userId: null as null | number,
    isLoggedIn: null as null | boolean,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(me.fulfilled, (state, action: PayloadAction<MePayload>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userId = action.payload.user;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          state.userId = action.payload.userId;
          state.isLoggedIn = action.payload.isLoggedIn;
        }
      );
  },
});

export const authReducer = slice.reducer;
export const authThunks = { me, login };
