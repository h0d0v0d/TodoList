import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { changeTaskEntityStatus, createAppAsyncThunk, getErorMessage } from "../../../common/utilis";
import { ChangeTaskArgs, DeleteTaskArgs, TaskType, tasksAPI } from "../tasks.api";
import { todoListsThunks } from "../../todoLists";
import { authThunks } from "../../auth";
import { RESULT_CODE } from "../../../app/app.slice";

const THUNK_PREFIXES = {
  TASKS: "tasks",
  GET_TASKS: "tasks/get-tasks",
  CREATE_TASKS: "tasks/create-tasks",
  CHANGE_TASK: "tasks/change-task",
  DELETE_TASK: "tasks/delete-tasks",
} as const;

type GetTasksPayload = { todoListId: string; tasks: TaskType[] };
const getTasks = createAppAsyncThunk<GetTasksPayload, { todoListId: string }>(
  THUNK_PREFIXES.GET_TASKS,
  async (args, { rejectWithValue }) => {
    const showGlobalError = true;
    const { todoListId } = args;
    try {
      const res = await tasksAPI.getTasks(todoListId);
      if (res.data.error === null) {
        return { todoListId, tasks: res.data.items };
      } else {
        const error = getErorMessage(res.data.error);
        return rejectWithValue({ error, showGlobalError });
      }
    } catch (e: any) {
      const error = getErorMessage(e);
      return rejectWithValue({ error, showGlobalError });
    }
  }
);

type CreateTasksArgs = { todoListId: string; title: string };
type CreateTasksPayload = { todoListId: string; item: TaskType };
const createTasks = createAppAsyncThunk<CreateTasksPayload, CreateTasksArgs>(
  THUNK_PREFIXES.CREATE_TASKS,
  async (args, { rejectWithValue }) => {
    const showGlobalError = true;
    const { todoListId } = args;
    try {
      const res = await tasksAPI.createTask(args);
      if (res.data.resultCode === RESULT_CODE.OK) {
        return { todoListId, item: res.data.data.item };
      } else {
        const error = getErorMessage(res.data);
        return rejectWithValue({ error, showGlobalError: true });
      }
    } catch (e: any) {
      const error = getErorMessage(e);
      return rejectWithValue({ error, showGlobalError });
    }
  }
);

type ChangeTaskPayload = { todoListId: string; taskId: string; item: TaskType };
const changeTask = createAppAsyncThunk<ChangeTaskPayload, ChangeTaskArgs>(
  THUNK_PREFIXES.CHANGE_TASK,
  async (args, { rejectWithValue }) => {
    const showGlobalError = true;
    const { todoListId, taskId } = args;
    try {
      const res = await tasksAPI.changeTask(args);
      if (res.data.resultCode === RESULT_CODE.OK) {
        return { todoListId, taskId, item: res.data.data.item };
      } else {
        const error = getErorMessage(res.data);
        return rejectWithValue({ error, showGlobalError, rejectData: { taskId, todoListId } });
      }
    } catch (e: any) {
      const error = getErorMessage(e);
      return rejectWithValue({ error, showGlobalError, rejectData: { taskId, todoListId } });
    }
  }
);

type DeleteTaskPaylaod = { todoListId: string; taskId: string };
const deleteTask = createAppAsyncThunk<DeleteTaskPaylaod, DeleteTaskArgs>(
  THUNK_PREFIXES.DELETE_TASK,
  async (args, { rejectWithValue, dispatch }) => {
    const { todoListId, taskId } = args;
    dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "loading" }));
    const showGlobalError = true;
    try {
      const res = await tasksAPI.deleteTask(args);
      if (res.data.resultCode === RESULT_CODE.OK) {
        return args;
      } else {
        const error = getErorMessage(res.data);
        dispatch(tasksActions.changeTaskIntityStatus({ todoListId, taskId, entityStatus: "error" }));
        return rejectWithValue({ error, showGlobalError, rejectData: { taskId, todoListId } });
      }
    } catch (e: any) {
      const error = getErorMessage(e);
      return rejectWithValue({ error, showGlobalError, rejectData: { taskId, todoListId } });
    }
  }
);

export type EntityStatus = "loading" | "successful" | "error" | "idle";
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
      // change task
      .addCase(changeTask.pending, (state, { meta: { arg } }) => {
        changeTaskEntityStatus({ state, todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "loading" });
      })
      .addCase(changeTask.rejected, (state, action) => {
        if (action.payload?.rejectData) {
          const { todoListId, taskId } = action.payload?.rejectData;
          const index = state.tasksData[todoListId].findIndex((task) => task.id === taskId);
          state.tasksData[todoListId][index].entityStatus = "error";
        }
      })
      .addCase(changeTask.fulfilled, (state, action) => {
        console.log("fulfilled");
        const index = state.tasksData[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId);
        state.tasksData[action.payload.todoListId].splice(index, 1, {
          ...action.payload.item,
          entityStatus: "successful",
        });
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasksData[action.payload.todoListId].findIndex((task) => task.id === action.payload.taskId);
        state.tasksData[action.payload.todoListId].splice(index, 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        // @ts-ignore
        const { todoListId, taskId } = action.payload.rejectPayload;
        const index = state.tasksData[todoListId].findIndex((task) => task.id === taskId);
        state.tasksData[todoListId][index].entityStatus = "error";
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
