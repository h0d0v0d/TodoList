import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "../../common/utilis/create-app-async-thunk";
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch";
import { ChangeTaskArgs, DeleteTaskArgs, TaskType, tasksAPI } from "./tasks.api";
import { todoListsThunks } from "../todoLists/todoLists.slice";
import { authThunks } from "../auth/auth.slice";
import { getErorMessage } from "../../common/utilis/getErrorMessage";
import { RESULT_CODE } from "../../app/app.slice";
import { toast } from "react-toastify";

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
    return thunkTryCatch(
      thunkApi,
      async () => {
        const { todoListId } = args;
        const res = await tasksAPI.getTasks(todoListId);
        if (res.data.error === null) {
          const tasks = res.data.items;
          return { todoListId, tasks };
        } else {
          const error = getErorMessage(res.data.error);
          toast.error(error);
          return thunkApi.rejectWithValue({ error, showGlobalError: true });
        }
      },
      { showGlobalError: true }
    );
  }
);

type CreateTasksArgs = { todoListId: string; title: string };
type CreateTasksPayload = { todoListId: string; item: TaskType };
const createTasks = createAppAsyncThunk<CreateTasksPayload, CreateTasksArgs>(
  THUNK_PREFIXES.CREATED_TASKS,
  async (args, thunkApi) => {
    return thunkTryCatch(
      thunkApi,
      async () => {
        const { todoListId } = args;
        const res = await tasksAPI.createTask(args);
        if (res.data.resultCode === RESULT_CODE.OK) {
          const item = res.data.data.item;
          return { todoListId, item };
        } else {
          const error = getErorMessage(res.data);
          toast.error(error);
          return thunkApi.rejectWithValue({ error, showGlobalError: true });
        }
      },
      { showGlobalError: true }
    );
  }
);

type ChangeTaskPayload = { todoListId: string; taskId: string; item: TaskType };
const changeTask = createAppAsyncThunk<ChangeTaskPayload, ChangeTaskArgs>(
  THUNK_PREFIXES.CHANGE_TASK,
  async (args, thunkApi) => {
    return thunkTryCatch(
      thunkApi,
      async () => {
        const { todoListId, taskId } = args;
        const changeTaskEntityStatus =
          ({ todoListId, taskId, entityStatus }: ChangeTaskEntityStatus) =>
          () => {
            thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus }));
          };

        changeTaskEntityStatus({ todoListId, taskId, entityStatus: "loading" });
        const res = await tasksAPI.changeTask(args);
        if (res.data.resultCode === RESULT_CODE.OK) {
          const item = res.data.data.item;
          changeTaskEntityStatus({ todoListId, taskId, entityStatus: "succeful" });
          return { todoListId, taskId, item };
        } else {
          const error = getErorMessage(res.data);
          toast.error(error);
          changeTaskEntityStatus({ todoListId, taskId, entityStatus: "error" });
          return thunkApi.rejectWithValue({ error, showGlobalError: true });
        }
      },
      { showGlobalError: true }
    );
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
      if (res.data.resultCode === RESULT_CODE.OK) {
        thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "succeful" }));
        return args;
      } else {
        const error = getErorMessage(res.data);
        toast.error(error);
        thunkApi.dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "error" }));
        return thunkApi.rejectWithValue({ error, showGlobalError: true });
      }
    });
  }
);

export type EntityStatus = "loading" | "succeful" | "error" | "idle";
export type ChangeTaskEntityStatus = { todoListId: string; taskId: string; entityStatus: EntityStatus };
export type AppTaskType = TaskType & { entityStatus: EntityStatus };
const slice = createSlice({
  name: THUNK_PREFIXES.TASKS,
  initialState: {
    tasksData: {} as { [key: string]: AppTaskType[] },
  },
  reducers: {
    changeTaskIntityStatus(state, action: PayloadAction<ChangeTaskEntityStatus>) {
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
      .addCase(changeTask.rejected, (state, action) => {
        console.log(action);
        //const index = state.tasksData[action.payload.todoListId].findIndex((task) => task.id === action.payload.datataskId);
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
