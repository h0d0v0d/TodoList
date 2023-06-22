import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

import { useAppDispatch } from "../../../hooks/storeHooks";

import "./login.scss";
import { toast } from "react-toastify";
import { loginTC } from "../../../state/reducers/auth-reducer";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "maksimmarck@gmail.com",
      password: "gfhn-56hrSk-2vr11",
      rememberMe: false,
    },
    mode: "onBlur",
  });
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(loginTC(data.email, data.password))
      .unwrap()
      .then(() => {
        navigate("/todo-lists");
        toast.success("Successful login");
      })
      .catch(() => {
        navigate("/error");
      });
    reset();
  };
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <TextField
            error={!!errors.email?.message}
            margin="dense"
            variant="standard"
            label={"Email"}
            helperText={errors.email?.message || " "}
            {...register("email")}
          />
          <TextField
            error={!!errors.password?.message}
            margin="dense"
            variant="standard"
            label="Password"
            type="password"
            helperText={errors.password?.message || " "}
            {...register("password")}
          />

          <button type="submit" disabled={!isValid}>
            Sign in
          </button>
        </FormGroup>
      </form>
    </div>
  );
};
