import axios from "axios";

import { ResponseType } from "../auth/auth.api";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
});

export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>(``);
  },
  createTodoList(args: CreateTodoListArgs) {
    return instance.post<ResponseType<{ item: TodoListType }>>(``, args);
  },
  changeTodoListTitle({ todoListId, title }: ChangeTodoListTitleArgs) {
    return instance.put<ResponseType>(`${todoListId}`, { title });
  },
  deleteTodoList({ todoListId }: DeleteTodoListArgs) {
    return instance.delete<ResponseType<{}>>(`${todoListId}`);
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
