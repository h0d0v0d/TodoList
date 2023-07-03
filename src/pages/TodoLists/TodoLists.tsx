import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Container, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { todoListsThunks } from "../../features/todoLists/todoLists.slice";
import { authThunks } from "../../features/auth/auth.slice";
import { selectTodoListsData } from "../../features/todoLists/todoLists.selectors";
import { selectAppLoading } from "../../app/app.selectors";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";

export const TodoLists = () => {
  const todolists = useAppSelector(selectTodoListsData);
  const globalLoading = useAppSelector(selectAppLoading);
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
    <>
      <div style={{ backgroundColor: "orange" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </div>
      {globalLoading && <LinearProgress />}
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist todoListId={tl.id} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
