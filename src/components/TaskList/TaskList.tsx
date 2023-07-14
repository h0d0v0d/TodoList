import React from "react";

import { Task } from "./Task/Task";

import { AppTaskType } from "../../features/tasks/model/tasks.slice";

type TaskListProps = {
  tasks: AppTaskType[];
  todoListId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, todoListId }) => {
  console.log("taskList");
  return (
    <div>
      {tasks.map((t) => (
        <Task key={t.id} task={t} todoListId={todoListId} />
      ))}
    </div>
  );
};
