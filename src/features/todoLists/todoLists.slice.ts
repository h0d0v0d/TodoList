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
import { tasksActions } from "../tasks/tasks.slice";

enum THUNK_PREFIXES {
  TODO_LISTS = "todo-lists",
  GET_TODO_LISTS = "todo-lists/get-todo-lists",
  CREATE_TODO_LIST = "todo-lists/create-todo-list",
  UPDATE_TODO_LIST_TITLE = "todo-lists/update-todo-list",
  DELETE_TODO_LIST = "todo-lists/delete-todo-list",
  CHANGE_FILTER = "todo-lists/change-filter",
}

type GetTodoListsPayload = { todoLists: TodoListType[] };
const getTodoLists = createAppAsyncThunk<GetTodoListsPayload>(THUNK_PREFIXES.GET_TODO_LISTS, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const res = await todoListAPI.getTodoLists();
    const todoLists = res.data;
    todoLists.forEach((tl) => {
      thunkApi.dispatch(tasksActions.inzializedTask({ toddoListId: tl.id }));
    });
    return { todoLists };
  });
});

type CreateTodoListPayload = { item: TodoListType };
const createTodoList = createAppAsyncThunk<CreateTodoListPayload, CreateTodoListArgs>(
  THUNK_PREFIXES.CREATE_TODO_LIST,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await todoListAPI.createTodoList(args);
      const item = res.data.data.item;
      return { item };
    });
  }
);

type ChangeTodoListTitlePayload = ChangeTodoListTitleArgs;
const changeTodoListTitle = createAppAsyncThunk<ChangeTodoListTitlePayload, ChangeTodoListTitleArgs>(
  THUNK_PREFIXES.UPDATE_TODO_LIST_TITLE,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await todoListAPI.changeTodoListTitle(args);
      return args;
    });
  }
);

type DeleteTodoListPayload = DeleteTodoListArgs;
const deleteTodoList = createAppAsyncThunk<DeleteTodoListPayload, DeleteTodoListArgs>(
  THUNK_PREFIXES.DELETE_TODO_LIST,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await todoListAPI.deleteTodoList(args);
      thunkApi.dispatch(tasksActions.deleteTodoList({ todoListId: args.todoListId }));
      return args;
    });
  }
);

type ChangeFilterArgs = { todoListId: string; filter: FilterType };
type ChangeFilterPayload = ChangeFilterArgs;
const changeFilter = createAppAsyncThunk<ChangeFilterPayload, ChangeFilterArgs>(
  THUNK_PREFIXES.CHANGE_FILTER,
  (args, thunkApi) => {
    return args;
  }
);

export type FilterType = "all" | "active" | "completed";
type AppTodoListType = TodoListType & {
  filter: FilterType;
};
const slice = createSlice({
  name: THUNK_PREFIXES.TODO_LISTS,
  initialState: {
    todoListsData: [] as AppTodoListType[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTodoLists.fulfilled, (state, action: PayloadAction<GetTodoListsPayload>) => {
        const todoLists: AppTodoListType[] = action.payload.todoLists.map((tl) => {
          return { ...tl, filter: "all" };
        });
        state.todoListsData = todoLists;
      })
      .addCase(createTodoList.fulfilled, (state, action: PayloadAction<CreateTodoListPayload>) => {
        const item: AppTodoListType = {
          ...action.payload.item,
          filter: "all",
        };
        state.todoListsData.unshift(item);
      })
      .addCase(changeTodoListTitle.fulfilled, (state, action: PayloadAction<ChangeTodoListTitlePayload>) => {
        state.todoListsData.forEach((tl: TodoListType) =>
          tl.id === action.payload.todoListId ? (tl.title = action.payload.title) : null
        );
      })
      .addCase(deleteTodoList.fulfilled, (state, action: PayloadAction<DeleteTodoListPayload>) => {
        const index = state.todoListsData.findIndex((tl) => tl.id === action.payload.todoListId);
        state.todoListsData.splice(index, 1);
      })
      .addCase(changeFilter.fulfilled, (state, action: PayloadAction<ChangeFilterArgs>) => {
        const index = state.todoListsData.findIndex((tl) => tl.id === action.payload.todoListId);
        state.todoListsData[index].filter = action.payload.filter;
      });
  },
});

export const todoListsReducer = slice.reducer;
export const todoListsThunks = {
  getTodoLists,
  createTodoList,
  changeTodoListTitle,
  deleteTodoList,
  changeFilter,
};
