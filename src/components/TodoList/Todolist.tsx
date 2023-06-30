import React, { useCallback, useEffect, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { tasksThunks } from "../../features/tasks/tasks.slice";
import { FilterType, todoListsThunks } from "../../features/todoLists/todoLists.slice";
import { filterTasks } from "../../common/utilis/filterTasks";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Task } from "../Task/Task";

import { TaskType } from "../../features/tasks/tasks.api";

type PropsType = {
  todoListId: string;
  title: string;
  filter: FilterType;
};

export const Todolist: React.FC<PropsType> = React.memo(({ todoListId, title, filter }) => {
  const tasks: TaskType[] = useAppSelector((state) => state.tasks.tasksData[todoListId]);
  const dispatch = useAppDispatch();

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTasks({ todoListId, title }));
    },
    [dispatch]
  );

  const deleteTodoList = useCallback(() => {
    dispatch(todoListsThunks.deleteTodoList({ todoListId }));
  }, [dispatch]);

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.changeTodoListTitle({ todoListId, title }));
    },
    [dispatch]
  );

  const changeFilterHandler = useCallback(
    (filter: FilterType) => {
      dispatch(todoListsThunks.changeFilter({ todoListId, filter }));
    },
    [dispatch]
  );

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filter);
  }, [tasks, filter]);

  useEffect(() => {
    dispatch(tasksThunks.getTasks({ todoListId }));
  }, []);

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={deleteTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {filteredTasks.map((t) => (
          <Task key={t.id} task={t} todoListId={todoListId} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          onClick={() => changeFilterHandler("all")}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          onClick={() => changeFilterHandler("active")}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={() => changeFilterHandler("completed")}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
