import React from "react";

import { Task } from "./Task/Task";

import { TaskType } from "../../features/tasks/tasks.api";

type TaskListProps = {
  filteredTasks: TaskType[];
  todoListId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ filteredTasks, todoListId }) => {
  return (
    <div>
      {filteredTasks.map((t) => (
        <Task key={t.id} task={t} todoListId={todoListId} />
      ))}
    </div>
  );
};
