import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Menu } from "@mui/icons-material";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { TodoListsL } from "../pages/TodoListsList/TodoListsL";
import Login from "../pages/login/Login";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", Component: TodoListsL },
  { path: "/login", Component: Login },
  { path: "/todo-lists", Component: TodoListsL },
]);

export function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}
