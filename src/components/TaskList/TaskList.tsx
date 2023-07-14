import React from "react";

import { Task } from "./Task/Task";

import { AppTaskType } from "../../features/tasks";

type TaskListProps = {
  tasks: AppTaskType[];
  todoListId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, todoListId }) => {
  return (
    <div>
      {tasks.map((t) => (
        <Task key={t.id} task={t} todoListId={todoListId} />
      ))}
    </div>
  );
};
