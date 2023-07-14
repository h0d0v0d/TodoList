import { ThunkAction, configureStore, Action, ThunkDispatch } from "@reduxjs/toolkit";

import { authReducer } from "../features/auth/";
import { tasksReducer } from "../features/tasks";
import { todoListsReducer } from "../features/todoLists";
import { AnyAction } from "redux";
import { appSlice } from "./app.slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
  },
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
