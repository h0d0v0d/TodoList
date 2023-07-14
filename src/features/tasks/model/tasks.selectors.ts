import { createSelector } from "@reduxjs/toolkit";

import { filterTasks } from "../../../common/utilis/filterTasks";

import { RootState } from "../../../app/store";
import { FilterType } from "../../todoLists";
import { AppTaskType } from "./tasks.slice";

export const selectTasksData = (state: RootState) => state.tasks.tasksData;

export const selectFilteredTasksById = createSelector(
  [selectTasksData, (_, args: { todoListId: string; filter: FilterType }) => args],
  (tasksData, args) => {
    return filterTasks(tasksData[args.todoListId], args.filter) as AppTaskType[];
  }
);
