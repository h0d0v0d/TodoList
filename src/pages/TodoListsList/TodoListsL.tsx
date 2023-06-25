import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";

import {
  FilterValuesType,
  changeTodoListTitleTC,
  createTodoListTC,
  deleteTodoListTC,
  setTodoListsTC,
  todoListReducerActions,
} from "../../state/reducers/todolists-reducer";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useAppSelector } from "../../hooks/storeHooks";
import { meTC } from "../../state/reducers/auth-reducer";
import { useNavigate } from "react-router-dom";

const { changeTodolistFilterAC } = todoListReducerActions;

export const TodoListsL = () => {
  const todolists = useAppSelector((state) => state.todolists);
  const tasks = useAppSelector((state) => state.tasks);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeFilter = useCallback(function (
    value: FilterValuesType,
    todolistId: string
  ) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  },
  []);

  const removeTodolist = useCallback(
    function (id: string) {
      dispatch(deleteTodoListTC(id));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      dispatch(changeTodoListTitleTC(id, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodoListTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    navigate("/login");
  } else {
  }

  useEffect(() => {
    dispatch(setTodoListsTC());
  }, []);

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  id={tl.id}
                  title={tl.title}
                  tasks={allTodolistTasks}
                  changeFilter={changeFilter}
                  filter={"all"}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
