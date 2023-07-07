import React, { useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";
import { Grid, Paper } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { tasksThunks } from "../../features/tasks/tasks.slice";
import { FilterType, todoListsThunks } from "../../features/todoLists/todoLists.slice";
import { selectTodoListById } from "../../features/todoLists/todoLists.selectors";
import { selectFilteredTasksById } from "../../features/tasks/tasks.selectors";
import { useActions } from "../../common/hooks/";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { TaskList } from "../TaskList/TaskList";

type PropsType = {
  todoListId: string;
};

export const Todolist: React.FC<PropsType> = React.memo(({ todoListId }) => {
  const { createTasks, getTasks } = useActions(tasksThunks);
  const { deleteTodoList, changeTodoListTitle, changeFilter } = useActions(todoListsThunks);
  const { title, filter } = useAppSelector((state) => selectTodoListById(state, todoListId));
  const filteredTasks = useAppSelector((state) => selectFilteredTasksById(state, { todoListId, filter }));
  const dispatch = useAppDispatch();

  const addTask = useCallback(
    (title: string) => {
      createTasks({ todoListId, title });
    },
    [dispatch, todoListId]
  );

  const deleteTodoListHandler = useCallback(() => {
    deleteTodoList({ todoListId });
  }, [dispatch, todoListId]);

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodoListTitle({ todoListId, title });
    },
    [dispatch, todoListId]
  );

  const changeFilterHandler = useCallback(
    (filter: FilterType) => {
      changeFilter({ todoListId, filter });
    },
    [dispatch, todoListId]
  );

  useEffect(() => {
    getTasks({ todoListId });
  }, []);

  return (
    <Grid item>
      <Paper style={{ padding: "10px" }}>
        <div>
          <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            <IconButton onClick={deleteTodoListHandler}>
              <Delete
                sx={{
                  color: "#DC143C",
                }}
              />
            </IconButton>
          </h3>
          <AddItemForm addItem={addTask} />
          <TaskList tasks={filteredTasks} todoListId={todoListId} />
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
      </Paper>
    </Grid>
  );
});
