import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ChangeTodoListTitleArgs,
  CreateTodoListArgs,
  DeleteTodoListArgs,
  TodoListType,
  todoListAPI,
} from "./todoLists.api";
import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";

enum THUNK_PREFIXES {
  TODO_LISTS = "todo-lists",
  GET_TODO_LISTS = "todo-lists/get-todo-lists",
  CREATE_TODO_LIST = "todo-lists/create-todo-list",
  UPDATE_TODO_LIST_TITLE = "todo-lists/update-todo-list",
  DELETE_TODO_LIST = "todo-lists/delete-todo-list",
}

type GetTodoListsPayload = { todoLists: TodoListType[] };
const getTodoLists = createAppAsyncThunk<GetTodoListsPayload>(
  THUNK_PREFIXES.GET_TODO_LISTS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await todoListAPI.getTodoLists();
      const todoLists = res.data;
      return { todoLists };
    });
  }
);

type CreateTodoListPayload = { item: TodoListType };
const createTodoList = createAppAsyncThunk<
  CreateTodoListPayload,
  CreateTodoListArgs
>(THUNK_PREFIXES.CREATE_TODO_LIST, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await todoListAPI.createTodoList(args);
    const item = res.data.data.item;
    return { item };
  });
});

type ChangeTodoListTitlePayload = ChangeTodoListTitleArgs;
const changeTodoListTitle = createAppAsyncThunk<
  ChangeTodoListTitlePayload,
  ChangeTodoListTitleArgs
>(THUNK_PREFIXES.UPDATE_TODO_LIST_TITLE, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const { todoListId, title } = args;
    const res = await todoListAPI.changeTodoListTitle(args);
    return args;
  });
});

type DeleteTodoListPayload = DeleteTodoListArgs;
const deleteTodoList = createAppAsyncThunk<
  DeleteTodoListPayload,
  DeleteTodoListArgs
>(THUNK_PREFIXES.DELETE_TODO_LIST, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await todoListAPI.deleteTodoList(args);
    return args;
  });
});

const slice = createSlice({
  name: THUNK_PREFIXES.TODO_LISTS,
  initialState: {
    todoLists: [] as TodoListType[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getTodoLists.fulfilled,
        (state, action: PayloadAction<GetTodoListsPayload>) => {
          state.todoLists = action.payload.todoLists;
        }
      )
      .addCase(
        createTodoList.fulfilled,
        (state, action: PayloadAction<CreateTodoListPayload>) => {
          state.todoLists.unshift(action.payload.item);
        }
      )
      .addCase(
        changeTodoListTitle.fulfilled,
        (state, action: PayloadAction<ChangeTodoListTitlePayload>) => {
          state.todoLists.map((tl) =>
            tl.id === action.payload.todoListId
              ? { ...tl, title: action.payload.title }
              : tl
          );
        }
      )
      .addCase(
        deleteTodoList.fulfilled,
        (state, action: PayloadAction<DeleteTodoListPayload>) => {
          state.todoLists.filter((tl) => tl.id !== action.payload.todoListId);
        }
      );
  },
});

export const todoListsReducer = slice.reducer;
export const todoListsThunks = { getTodoLists, createTodoList };
