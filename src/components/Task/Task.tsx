import React, { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import { useAppDispatch } from "../../common/hooks";
import { tasksThunks } from "../../features/tasks/tasks.slice";

import { EditableSpan } from "../EditableSpan/EditableSpan";

import { TaskType } from "../../features/tasks/tasks.api";

type TaskPropsType = { task: TaskType; todoListId: string };
export const Task: React.FC<TaskPropsType> = React.memo(({ todoListId, task }) => {
  const dispatch = useAppDispatch();

  const deleteTask = useCallback(() => {
    dispatch(
      tasksThunks.deleteTask({
        todoListId,
        taskId: task.id,
      })
    );
  }, [dispatch]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.changeTask({
          todoListId,
          taskId: task.id,
          title: task.title,
          status: Number(e.currentTarget.checked),
        })
      );
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (newValue: string) => {
      dispatch(
        tasksThunks.changeTask({
          todoListId,
          taskId: task.id,
          title: newValue,
        })
      );
    },
    [dispatch]
  );

  return (
    <div key={task.id} className={true ? "is-done" : ""}>
      <Checkbox checked={!!task.status} color="primary" onChange={onChangeHandler} />
      <EditableSpan value={task.title} onChange={changeTaskTitle} />
      <IconButton onClick={deleteTask}>
        <Delete />
      </IconButton>
    </div>
  );
});
