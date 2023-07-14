import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container, Toolbar } from "@mui/material";

import { useActions, useAppDispatch, useAppSelector } from "../../common/hooks";
import { todoListsThunks } from "../../features/todoLists/model/todoLists.slice";
import { authThunks } from "../../features/auth/model/auth.slice";
import { selectTodoListsData } from "../../features/todoLists/model/todoLists.selectors";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { authSelectors } from "../../features/auth/model/auth.selectors";

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

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        console.log("3");
      });
  };

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
