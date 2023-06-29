import { TaskType } from "../../features/tasks/tasks.api";
import { FilterType } from "../../features/todoLists/todoLists.slice";

export const filterTasks = (tasks: TaskType[], filter: FilterType) => {
  switch (filter) {
    case "completed":
      return tasks.filter((task) => task.status === 1);
    case "active":
      return tasks.filter((task) => task.status === 0);
    default:
      return tasks;
  }
};
