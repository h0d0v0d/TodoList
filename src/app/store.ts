import {
  ThunkAction,
  configureStore,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { authReducer } from "../features/auth/auth.slice";
import { tasksReducer } from "../features/tasks/tasks.slice";
import { todoListsReducer } from "../features/todoLists/todoLists.slice";
import { AnyAction } from "redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
  },
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
