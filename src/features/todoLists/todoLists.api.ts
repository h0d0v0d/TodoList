import axios from "axios";

import { ResponseType } from "../auth/auth.api";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>(`todo-lists`);
  },
  createTodoList(args: CreateTodoListArgs) {
    return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, args);
  },
  changeTodoListTitle({ todoListId, title }: ChangeTodoListTitleArgs) {
    return instance.put<ResponseType>(`todo-lists/${todoListId}`, { title });
  },
  deleteTodoList({ todoListId }: DeleteTodoListArgs) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todoListId}`);
  },
};

export type TodoListType = {
  addedDate: Date;
  id: string;
  order: number;
  title: string;
};

// Create TodoList
export type CreateTodoListArgs = { title: string };

// Change TodoList Title
export type ChangeTodoListTitleArgs = { todoListId: string; title: string };

// Delete TodoList
export type DeleteTodoListArgs = { todoListId: string };
