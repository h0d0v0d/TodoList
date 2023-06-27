import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType, UpdateTaskStatusArgs, tasksAPI } from "./tasks.api";
import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";

enum THUNK_PREFIXES {
  TASKS = "tasks",
  SET_TASKS = "tasks/set-tasks",
  CREATE_TASKS = "tasks/create-tasks",
  UPDATE_TASK_STATUS = "tasks/update-task-status",
}

type SetTasksPayload = { todoListId: string; tasks: TaskType[] };
const setTasks = createAppAsyncThunk<SetTasksPayload, { todoListId: string }>(
  THUNK_PREFIXES.SET_TASKS,
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
  THUNK_PREFIXES.CREATE_TASKS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const { todoListId, title } = args;
      const res = await tasksAPI.createTask(args);
      const item = res.data.data.item;
      return { todoListId, item };
    });
  }
);

type UpdateTaskStatus = { todoListId: string; taskId: string; item: TaskType };
const updateTaskStatus = createAppAsyncThunk<
  UpdateTaskStatus,
  UpdateTaskStatusArgs
>(THUNK_PREFIXES.UPDATE_TASK_STATUS, async (args, thunkApi) => {
  return thunkTryCatch(thunkApi, async () => {
    const { todoListId, taskId } = args;
    const res = await tasksAPI.updateTaskStatus(args);
    const item = res.data.data.item;
    return { todoListId, taskId, item };
  });
});

const slice = createSlice({
  name: THUNK_PREFIXES.TASKS,
  initialState: {} as { [key: string]: TaskType[] },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        setTasks.fulfilled,
        (state, action: PayloadAction<SetTasksPayload>) => {
          state[action.payload.todoListId] = action.payload.tasks;
        }
      )
      .addCase(
        createTasks.fulfilled,
        (state, action: PayloadAction<CreateTasksPayload>) => {
          state[action.payload.todoListId] = [
            ...state[action.payload.todoListId],
            action.payload.item,
          ];
        }
      )
      .addCase(
        updateTaskStatus.fulfilled,
        (state, action: PayloadAction<UpdateTaskStatus>) => {}
      );
  },
});

export const tasksReducer = slice.reducer;
