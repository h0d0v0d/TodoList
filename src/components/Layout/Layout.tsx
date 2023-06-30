import React, { useEffect } from "react";
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/storeHooks";
import { authThunks } from "../../features/auth/auth.slice";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authThunks.me({}))
      .unwrap()
      .then(() => {
        navigate("/todo-lists");
      });
  }, []);
  return (
    <div className="">
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
        <Outlet />
      </Container>
    </div>
  );
};
