import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import TextField from "@mui/material/TextField";

import { useAppDispatch } from "../../common/hooks";

import { authThunks } from "../../features/auth/auth.slice";

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
      email: "pixaretyiypop@gmail.com",
      password: "vevJig-9sudbi-tosmyz",
      rememberMe: false,
    },
    mode: "onBlur",
  });
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(authThunks.login(data))
      .unwrap()
      .then(() => {
        navigate("/todo-lists");
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
