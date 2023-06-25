import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import {
  TaskType,
  deleteTaskTC,
  updateTaskStatusTC,
  updateTaskTitleTC,
} from "../../state/reducers/tasks-reducer";
import { useAppDispatch } from "../../hooks/storeHooks";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();

  const onClickHandler = useCallback(() => {
    dispatch(deleteTaskTC(props.todolistId, props.task.id));
  }, [dispatch]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskStatusTC(
          props.todolistId,
          props.task.id,
          Number(e.currentTarget.checked)
        )
      );
    },
    [dispatch]
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      dispatch(updateTaskTitleTC(props.todolistId, props.task.id, newValue));
    },
    [dispatch]
  );

  return (
    <div
      key={props.task.id}
      className={/* props.task.isDone */ true ? "is-done" : ""}
    >
      <Checkbox
        checked={!!props.task.status}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
      <span>{props.task.status}</span>
    </div>
  );
});
