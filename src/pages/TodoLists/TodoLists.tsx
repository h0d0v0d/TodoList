import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { useAppDispatch } from "../../hooks/storeHooks";
import { useAppSelector } from "../../hooks/storeHooks";
import { todoListsThunks } from "../../features/todoLists/todoLists.slice";

import { Todolist } from "../../components/TodoList/Todolist";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";

export const TodoLists = () => {
  const todolists = useAppSelector((state) => state.todoLists.todoListsData);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.createTodoList({ title }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(todoListsThunks.getTodoLists());
  }, []);

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todoListId={tl.id} title={tl.title} filter={tl.filter} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
