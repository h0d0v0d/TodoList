import { AppTodoListType } from "../../features/todoLists/todoLists.slice";
import { useAppSelector } from "../hooks";

export const useTodoListByIdSelector = (todoListId: string) =>
  useAppSelector((state) => {
    const todoList: AppTodoListType =
      state.todoLists.todoListsData.find((tl) => tl.id === todoListId) || ({} as AppTodoListType);
    return todoList;
  });
