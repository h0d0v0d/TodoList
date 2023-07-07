import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import TextField from "@mui/material/TextField";
import { ResponseType } from "../../features/auth/auth.api";

import { useActions, useAppDispatch } from "../../common/hooks";

import { authThunks } from "../../features/auth/auth.slice";

import "./login.css";
import { emailValidate, passwordValidate } from "../../common/utilis/validate";

export const Login = () => {
  const { login } = useActions(authThunks);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      email: "pixaretyiypop@gmail.com",
      password: "vevJig-9sudbi-tosmyz",
      rememberMe: false,
    },
    mode: "onBlur",
  });
  const onSubmit = (data: { email: string; password: string }) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate("/todo-lists");
      })
      .catch((reason: ResponseType) => {
        if (reason.fieldsErrors.length === 0) return;
        reason.fieldsErrors.forEach((r) => {
          // @ts-ignore
          setError(r.field, { type: "value", message: r.error });
        });
      });
    reset();
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-form-header">
          <h2>Log in</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              error={!!errors.email?.message}
              margin="dense"
              variant="standard"
              label={"Email"}
              helperText={errors.email?.message || " "}
              {...register("email", { validate: emailValidate })}
            />
            <TextField
              error={!!errors.password?.message}
              margin="dense"
              variant="standard"
              label="Password"
              type="password"
              helperText={errors.password?.message || " "}
              {...register("password", { validate: passwordValidate })}
            />

            <button type="submit" disabled={!isValid}>
              Sign in
            </button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};
