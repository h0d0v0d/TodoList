import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const todoListAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>(`todo-lists`);
  },
  createTodoList({ title }: CreateTodoListArgs) {
    return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {
      title,
    });
  },
  changeTodoListTitle({ todoListId, title }: ChangeTodoListTitleArgs) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todoListId}`, {
      title,
    });
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

type ResponseType<T> = {
  data: T;
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
};

// Create TodoList
export type CreateTodoListArgs = { title: string };

// Change TodoList Title
export type ChangeTodoListTitleArgs = { todoListId: string; title: string };

// Delete TodoList
export type DeleteTodoListArgs = { todoListId: string };
