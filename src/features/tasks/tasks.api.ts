import axios from "axios";

import { ResponseType } from "../auth/auth.api";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
});

export const tasksAPI = {
  getTasks(todoListID: string) {
    return instance.get<GetTasksResponse>(`${todoListID}/tasks`);
  },
  createTask({ todoListId, title }: CreateTaskArgs) {
    return instance.post<ResponseType<{ item: TaskType }>>(`${todoListId}/tasks`, { title });
  },
  changeTask({ todoListId, taskId, ...restArgs }: ChangeTaskArgs) {
    return instance.put<ResponseType<{ item: TaskType }>>(`${todoListId}/tasks/${taskId}`, restArgs);
  },
  deleteTask({ todoListId, taskId }: DeleteTaskArgs) {
    return instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`);
  },
};

export type TaskType = {
  addedDate: Date;
  deadline: Date | null;
  description: string | null;
  id: string;
  order: number;
  priority: number;
  startDate: Date | null;
  status: number;
  title: string;
  todoListId: string;
};

// Get Tasks
type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

// Create Task
type CreateTaskArgs = {
  todoListId: string;
  title: string;
};

// Change Task
export type ChangeTaskArgs = {
  todoListId: string;
  taskId: string;
  title: string;
  status?: number;
};

// DeleteTask
export type DeleteTaskArgs = {
  todoListId: string;
  taskId: string;
};
