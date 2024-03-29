import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LoginArgs, User, authAPI } from "../auth.api";
import { createAppAsyncThunk } from "../../../common/utilis";
import { RESULT_CODE } from "../../../app/app.slice";
import { getErorMessage } from "../../../common/utilis";

const THUNK_PREFIXES = {
  AUTH: "auth",
  ME: "auth/me",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
} as const;

type MePayload = { isLoggedIn: boolean; user: User };
const me = createAppAsyncThunk<MePayload>(THUNK_PREFIXES.ME, async (_, { rejectWithValue }) => {
  const showGlobalError = true;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.OK) {
      return { isLoggedIn: true, user: res.data.data };
    } else {
      const error = getErorMessage(res.data);
      return rejectWithValue({ error, showGlobalError });
    }
  } catch (e: any) {
    const error = getErorMessage(e);
    return rejectWithValue({ error, showGlobalError });
  }
});

type LoginPayload = { isLoggedIn: boolean; userId: number };
const login = createAppAsyncThunk<LoginPayload, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    const showGlobalError = true;
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.resultCode === RESULT_CODE.OK) {
        const userId = res.data.data.userId;
        return { isLoggedIn: true, userId };
      } else {
        if (res.data.fieldsErrors?.length === 0) {
          const error = getErorMessage(res.data);
          return rejectWithValue({ error, showGlobalError });
        } else {
          const error = getErorMessage(res.data);
          return rejectWithValue({ error, showGlobalError });
        }
      }
    } catch (e: any) {
      const error = getErorMessage(e);
      return rejectWithValue({ error, showGlobalError });
    }
  }
);

type LogoutPayload = { isLoggedIn: boolean };
const logout = createAppAsyncThunk<LogoutPayload>(THUNK_PREFIXES.LOGOUT, async (_, { rejectWithValue }) => {
  const showGlobalError = true;
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.OK) {
      return { isLoggedIn: false };
    } else {
      const error = getErorMessage(res.data);
      return rejectWithValue({ error, showGlobalError });
    }
  } catch (e: any) {
    const error = getErorMessage(e);
    return rejectWithValue({ error, showGlobalError });
  }
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
