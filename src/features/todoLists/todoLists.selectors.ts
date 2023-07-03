import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AppTodoListType } from "./todoLists.slice";

export const selectTodoListsData = (state: RootState) => state.todoLists.todoListsData;

export const selectTodoListById = createSelector(
  [selectTodoListsData, (_, todoListId) => todoListId],
  (todoListsData, todoListId) => {
    return todoListsData.find((tl) => tl.id === todoListId) || ({} as AppTodoListType);
  }
);
