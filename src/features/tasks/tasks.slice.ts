import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";
import { ChangeTaskArgs, DeleteTaskArgs, TaskType, tasksAPI } from "./tasks.api";
import { todoListsThunks } from "../todoLists/todoLists.slice";
import { authThunks } from "../auth/auth.slice";

const THUNK_PREFIXES = {
  TASKS: "tasks",
  GET_TASKS: "tasks/get-tasks",
  CREATED_TASKS: "tasks/create-tasks",
  CHANGE_TASK: "tasks/change-task",
  DELETE_TASK: "tasks/delete-tasks",
} as const;

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

type ChangeTaskPayload = { todoListId: string; taskId: string; item: TaskType };
const changeTask = createAppAsyncThunk<ChangeTaskPayload, ChangeTaskArgs>(
  THUNK_PREFIXES.CHANGE_TASK,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const { todoListId, taskId } = args;
      thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "loading" }));
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
    const { todoListId, taskId } = args;
    thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "loading" }));
    return thunkTryCatch(thunkApi, async () => {
      const res = await tasksAPI.deleteTask(args);
      thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "succeful" }));
      return args;
    });
  }
);

export type EntityStatus = "loading" | "succeful" | "error" | "idle";
export type AppTaskType = TaskType & { entityStatus: EntityStatus };
const slice = createSlice({
  name: THUNK_PREFIXES.TASKS,
  initialState: {
    tasksData: {} as { [key: string]: AppTaskType[] },
  },
  reducers: {
    changeTaskIntityStatus(
      state,
      action: PayloadAction<{ todoListId: string; taskId: string; entityStatus: EntityStatus }>
    ) {
      const { todoListId, taskId, entityStatus } = action.payload;
      const index = state.tasksData[todoListId].findIndex((task) => task.id === taskId);
      state.tasksData[todoListId][index].entityStatus = entityStatus;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        const tasks: AppTaskType[] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }));
        state.tasksData[action.payload.todoListId] = tasks;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.tasksData[action.payload.todoListId] = [
          ...state.tasksData[action.payload.todoListId],
          { ...action.payload.item, entityStatus: "idle" },
        ];
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        const index = state.tasksData[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId);
        state.tasksData[action.payload.todoListId].splice(index, 1, { ...action.payload.item, entityStatus: "idle" });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasksData[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId);
        state.tasksData[action.payload.todoListId].splice(index, 1);
      })
      // todo lists reducers
      .addCase(todoListsThunks.getTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state.tasksData[tl.id] = [];
        });
      })
      .addCase(todoListsThunks.createTodoList.fulfilled, (state, action) => {
        state.tasksData[action.payload.item.id] = [];
      })
      .addCase(todoListsThunks.deleteTodoList.fulfilled, (state, action) => {
        delete state.tasksData[action.payload.todoListId];
      })
      // auth reducers
      .addCase(authThunks.logout.fulfilled, (state) => {
        state.tasksData = {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksThunks = { getTasks, createTasks, changeTask, deleteTask };
export const tasksActions = slice.actions;
