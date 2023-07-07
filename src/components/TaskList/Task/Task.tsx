import React, { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import { useActions, useAppDispatch } from "../../../common/hooks";
import { AppTaskType, tasksThunks } from "../../../features/tasks/tasks.slice";

import { EditableSpan } from "../../EditableSpan/EditableSpan";

type TaskPropsType = { task: AppTaskType; todoListId: string };
export const Task: React.FC<TaskPropsType> = React.memo(({ todoListId, task }) => {
  const { deleteTask, changeTask } = useActions(tasksThunks);
  const dispatch = useAppDispatch();

  const deleteTaskHandler = useCallback(() => {
    deleteTask({ todoListId, taskId: task.id });
  }, [dispatch]);

  const changeTaskHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changeTask({
        todoListId,
        taskId: task.id,
        title: task.title,
        status: Number(e.currentTarget.checked),
      });
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      changeTask({ todoListId, taskId: task.id, title });
    },
    [dispatch]
  );

  return (
    <div key={task.id} className={true ? "is-done" : ""}>
      <Checkbox
        checked={!!task.status}
        color="primary"
        onChange={changeTaskHandler}
        disabled={task.entityStatus === "loading"}
      />
      <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={task.entityStatus === "loading"} />
      <IconButton onClick={deleteTaskHandler} disabled={task.entityStatus === "loading"}>
        <Delete sx={{ color: "#DC143C" }} />
      </IconButton>
    </div>
  );
});
