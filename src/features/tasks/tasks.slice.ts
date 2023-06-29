import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";
import {
  ChangeTaskArgs,
  DeleteTaskArgs,
  TaskType,
  tasksAPI,
} from "./tasks.api";

enum THUNK_PREFIXES {
  TASKS = "tasks",
  GET_TASKS = "tasks/get-tasks",
  CREATED_TASKS = "tasks/create-tasks",
  CHANGE_TASK = "tasks/change-task",
  DELETE_TASK = "tasks/delete-tasks",
}

type GetTasksPayload = { todoListId: string; tasks: TaskType[] };
const getTasks = createAppAsyncThunk<GetTasksPayload, { todoListId: string }>(
  THUNK_PREFIXES.GET_TASKS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const { todoListId } = args;
      const res = await tasksAPI.getTasks(todoListId);
      const tasks = res.data.items;
      return { todoListId, tasks };
    });
  }
);

type CreateTasksArgs = { todoListId: string; title: string };
type CreateTasksPayload = { todoListId: string; item: TaskType };
const createTasks = createAppAsyncThunk<CreateTasksPayload, CreateTasksArgs>(
  THUNK_PREFIXES.CREATED_TASKS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const { todoListId } = args;
      const res = await tasksAPI.createTask(args);
      const item = res.data.data.item;
      return { todoListId, item };
    });
  }
);

type ChangeTaskPayload = {
  todoListId: string;
  taskId: string;
  item: TaskType;
};
const changeTask = createAppAsyncThunk<ChangeTaskPayload, ChangeTaskArgs>(
  THUNK_PREFIXES.CHANGE_TASK,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const { todoListId, taskId } = args;
      const res = await tasksAPI.changeTask(args);
      const item = res.data.data.item;
      return { todoListId, taskId, item };
    });
  }
);

type DeleteTaskPaylaod = { todoListId: string; taskId: string };
const deleteTask = createAppAsyncThunk<DeleteTaskPaylaod, DeleteTaskArgs>(
  THUNK_PREFIXES.DELETE_TASK,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await tasksAPI.deleteTask(args);
      return args;
    });
  }
);

const slice = createSlice({
  name: THUNK_PREFIXES.TASKS,
  initialState: {
    tasksData: {} as { [key: string]: TaskType[] },
  },
  reducers: {
    deleteTodoList(state, action: PayloadAction<{ todoListId: string }>) {
      delete state.tasksData[action.payload.todoListId];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<GetTasksPayload>) => {
          state.tasksData[action.payload.todoListId] = action.payload.tasks;
        }
      )
      .addCase(
        createTasks.fulfilled,
        (state, action: PayloadAction<CreateTasksPayload>) => {
          state.tasksData[action.payload.todoListId] = [
            ...state.tasksData[action.payload.todoListId],
            action.payload.item,
          ];
        }
      )
      .addCase(
        changeTask.fulfilled,
        (state, action: PayloadAction<ChangeTaskPayload>) => {
          const index = state.tasksData[action.payload.todoListId].findIndex(
            (task) => task.id === action.payload.taskId
          );
          state.tasksData[action.payload.todoListId].splice(
            index,
            1,
            action.payload.item
          );
        }
      )
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<DeleteTaskPaylaod>) => {
          const index = state.tasksData[action.payload.todoListId].findIndex(
            (task) => task.id === action.payload.taskId
          );
          state.tasksData[action.payload.todoListId].splice(index, 1);
        }
      );
  },
});

export const tasksReducer = slice.reducer;
export const tasksThunks = { getTasks, createTasks, changeTask, deleteTask };
export const tasksActions = slice.actions;
