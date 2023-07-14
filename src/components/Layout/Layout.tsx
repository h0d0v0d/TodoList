import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { authThunks } from "../../features/auth/model/auth.slice";
import { LinearProgress } from "@mui/material";
import { appSelectors } from "../../app/app.selectors";

import { Toast } from "../Toast/Toast";

export const Layout = () => {
  const navigate = useNavigate();
  const globalLoading = useAppSelector(appSelectors.loading);
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
      {globalLoading && <LinearProgress />}
      <Outlet />
      <Toast />
    </div>
  );
};
