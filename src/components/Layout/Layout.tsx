import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { authThunks } from "../../features/auth/auth.slice";
import { LinearProgress } from "@mui/material";
import { appSelectors } from "../../app/app.selectors";

import Toast from "../Toast/Toast";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  const navigate = useNavigate();
  const globalLoading = useAppSelector(appSelectors.loading);
  const error = useAppSelector(appSelectors.error);
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
      error
      {error && <h2>{error}</h2>}
      <Outlet />
    </div>
  );
};
