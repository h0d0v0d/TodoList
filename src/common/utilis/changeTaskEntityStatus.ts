import { AppTaskType, EntityStatus } from "../../features/tasks";

type TasksSliceType = {
  tasksData: { [key: string]: AppTaskType[] };
};

export type ChangeTaskEntityStatus = {
  state: TasksSliceType;
  todoListId: string;
  taskId: string;
  entityStatus: EntityStatus;
};
export const changeTaskEntityStatus = ({ state, todoListId, taskId, entityStatus }: ChangeTaskEntityStatus) => {
  const index = state.tasksData[todoListId].findIndex((task) => task.id === taskId);
  state.tasksData[todoListId][index].entityStatus = entityStatus;
};
