import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

import { toast } from "react-toastify";
import { loginTC } from "../../state/reducers/auth-reducer";

export const Login = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      email: "pixaretyiypop@gmail.com",
      password: "vevJig-9sudbi-tosmyz",
      rememberMe: false,
    },
    mode: "onBlur",
  });
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(loginTC(data.email, data.password));
    reset();
  };
  if (isLoggedIn) {
    navigate("/todo-lists");
  }
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
