import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Todolist } from "./TodoList/Todolist";
import { AddItemForm } from "../../AddItemForm/AddItemForm";

import {
  FilterValuesType,
  changeTodoListTitleTC,
  createTodoListTC,
  deleteTodoListTC,
  setTodoListsTC,
  todoListReducerActions,
} from "../../../state/reducers/todolists-reducer";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { useAppSelector } from "../../../hooks/storeHooks";
import { meTC } from "../../../state/reducers/auth-reducer";

const { changeTodolistFilterAC } = todoListReducerActions;

export const TodoListsL = () => {
  const todolists = useAppSelector((state) => state.todolists);
  const tasks = useAppSelector((state) => state.tasks);
  // const isAuth = useAppSelector((state) => state.tasks.)
  const dispatch = useAppDispatch();

  const set = () => {
    dispatch(setTodoListsTC());
    dispatch(meTC());
  };

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

  useEffect(() => {
    set();
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
