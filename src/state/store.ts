import thunkMiddleware, { ThunkAction } from "redux-thunk";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import { ThunkDispatch } from "redux-thunk";

import { TasksActionsType, tasksReducer } from "./reducers/tasks-reducer";
import {
  TodoListsActionsType,
  todolistsReducer,
} from "./reducers/todolists-reducer";
import { AuthReducerActionsType, authReducer } from "./reducers/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type AppActionType =
  | TasksActionsType
  | TodoListsActionsType
  | AuthReducerActionsType;
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionType
>;
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
