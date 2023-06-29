import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
/* import {
  TaskType,
  deleteTaskTC,
  updateTaskStatusTC,
  updateTaskTitleTC,
} from "../../state/reducers/tasks-reducer"; */
import { useAppDispatch } from "../../hooks/storeHooks";
import { tasksThunks } from "../../features/tasks/tasks.slice";
import { TaskType } from "../../features/tasks/tasks.api";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};
export const Task: React.FC<TaskPropsType> = React.memo(
  ({ todoListId, task }) => {
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
        console.log("cha");
        dispatch(
          tasksThunks.changeTask({
            todoListId,
            taskId: task.id,
            title: task.title,
            status: Number(e.currentTarget.checked),
          })
        );
      },
      /* (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskStatusTC(
          props.todolistId,
          props.task.id,
          Number(e.currentTarget.checked)
        )
      );
    }, */
      [dispatch]
    );

    const onTitleChangeHandler = useCallback(
      (newValue: string) => {
        // dispatch(updateTaskTitleTC(props.todolistId, props.task.id, newValue));
      },
      [dispatch]
    );

    return (
      <div
        key={task.id}
        className={/* props.task.isDone */ true ? "is-done" : ""}
      >
        <Checkbox
          checked={!!task.status}
          color="primary"
          onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={deleteTask}>
          <Delete />
        </IconButton>
        <span>{task.status}</span>
      </div>
    );
  }
);
