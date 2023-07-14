import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container, Toolbar } from "@mui/material";

import { useActions, useAppDispatch, useAppSelector } from "../../common/hooks";
import { todoListsThunks, selectTodoListsData } from "../../features/todoLists";
import { authThunks } from "../../features/auth/model/auth.slice";
import { authSelectors } from "../../features/auth";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";

export const TodoLists = () => {
  const todolists = useAppSelector(selectTodoListsData);
  const user = useAppSelector(authSelectors.user);
  const { createTodoList, logout, getTodoLists } = useActions({ ...authThunks, ...todoListsThunks });
  const dispatch = useAppDispatch();

  const addTodolist = useCallback(
    (title: string) => {
      createTodoList({ title });
    },
    [dispatch]
  );

  const logoutHandler = useCallback(() => {
    logout().unwrap();
  }, [dispatch]);

  useEffect(() => {
    getTodoLists();
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
          <div className="user-info">
            <h2>{user.login}</h2>
          </div>
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
