import React, { useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Task } from "../Task/Task";

import { FilterValuesType } from "../../state/reducers/todolists-reducer";
/* import {
  TaskType,
  createTaskTC,
  setTasksTC,
} from "../../state/reducers/tasks-reducer"; */
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { tasksThunks } from "../../features/tasks/tasks.slice";
import { todoListsThunks } from "../../features/todoLists/todoLists.slice";

type PropsType = {
  id: string;
  title: string;
  tasks: Array<any>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist: React.FC<PropsType> = React.memo(
  ({ id, title, filter }) => {
    const tasks = useAppSelector((state) => state.tasks.tasksData[id]) || [];
    const dispatch = useAppDispatch();

    const addTask = useCallback(
      (title: string) => {
        dispatch(tasksThunks.createTasks({ todoListId: id, title }));
      },
      [dispatch]
    );

    const deleteTodoList = useCallback(() => {
      dispatch(todoListsThunks.deleteTodoList({ todoListId: id }));
    }, [dispatch]);

    const changeTodolistTitleHandler = useCallback(
      (title: string) => {
        dispatch(
          todoListsThunks.changeTodoListTitle({ todoListId: id, title })
        );
      },
      [id, dispatch]
    );

    const changeFilterHandler = () => {
      console.log("Фильтр измениться, когда нибуль это сработает");
    };

    useEffect(() => {
      dispatch(tasksThunks.getTasks({ todoListId: id }));
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
          {tasks.map((t) => (
            <Task key={t.id} task={t} todolistId={id} />
          ))}
        </div>
        <div style={{ paddingTop: "10px" }}>
          <Button
            variant={filter === "all" ? "outlined" : "text"}
            onClick={changeFilterHandler}
            color={"inherit"}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "outlined" : "text"}
            onClick={changeFilterHandler}
            color={"primary"}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "outlined" : "text"}
            onClick={changeFilterHandler}
            color={"secondary"}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
);
