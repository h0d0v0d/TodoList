import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";

import { authReducer } from "../features/auth/auth.slice";
import { tasksReducer } from "../features/tasks/tasks.slice";
import { todoListsReducer } from "../features/todoLists/todoLists.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
