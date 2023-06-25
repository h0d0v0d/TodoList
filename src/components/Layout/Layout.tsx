import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

import { authThunks } from "../../features/auth/auth.slice";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const s = useAppSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    // @ts-ignore
    // dispatch(authThunks.me({}));
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
