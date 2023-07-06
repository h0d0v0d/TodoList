import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Container, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { todoListsThunks } from "../../features/todoLists/todoLists.slice";
import { authThunks } from "../../features/auth/auth.slice";
import { selectTodoListsData } from "../../features/todoLists/todoLists.selectors";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";

export const TodoLists = () => {
  console.log("list todo");
  const todolists = useAppSelector(selectTodoListsData);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.createTodoList({ title }));
    },
    [dispatch]
  );

  const logout = () => {
    dispatch(authThunks.logout({}));
  };

  useEffect(() => {
    dispatch(todoListsThunks.getTodoLists());
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </div>
      <Container fixed>
        <Grid container style={{ padding: "20px 0" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return <Todolist todoListId={tl.id} key={tl.id} />;
          })}
        </Grid>
      </Container>
    </div>
  );
};
