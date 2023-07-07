import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LoginArgs, User, authAPI } from "./auth.api";
import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";
import { handleServerError505 } from "../../common/utilis/server-error";

const THUNK_PREFIXES = {
  AUTH: "auth",
  ME: "auth/me",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
} as const;

type MePayload = { isLoggedIn: boolean; user: User };
const me = createAppAsyncThunk<MePayload, {}>(THUNK_PREFIXES.ME, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true, user: res.data.data };
    } else {
      return thunkApi.rejectWithValue({ value: "error" });
    }
  });
});

type LoginPayload = { isLoggedIn: boolean; userId: number };
const login = createAppAsyncThunk<LoginPayload, LoginArgs>(THUNK_PREFIXES.LOGIN, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await authAPI.login({
      email: args.email,
      password: args.password,
    });
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true, userId: res.data.data.userId };
    } else {
      return thunkApi.rejectWithValue(res.data);
    }
  });
});

type LogoutPayload = { isLoggedIn: boolean };
const logout = createAppAsyncThunk<LogoutPayload, any>(THUNK_PREFIXES.LOGOUT, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await authAPI.logout();
    return { isLoggedIn: false };
  });
});

const slice = createSlice({
  name: THUNK_PREFIXES.AUTH,
  initialState: {
    user: {
      userId: null as null | number,
      email: null as null | string,
      login: null as null | string,
    },
    isLoggedIn: null as null | boolean,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(me.fulfilled, (state, action: PayloadAction<MePayload>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.user.userId = action.payload.userId;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<LogoutPayload>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user.email = null;
        state.user.login = null;
        state.user.userId = null;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { me, login, logout };
