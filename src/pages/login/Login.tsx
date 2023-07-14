import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import TextField from "@mui/material/TextField";

import { authThunks } from "../../features/auth/model/auth.slice";

import { emailValidate, passwordValidate } from "../../common/utilis";
import { getErorMessage } from "../../common/utilis";
import { useActions } from "../../common/hooks";

import { ResponseType } from "../../features/auth/auth.api";
import "./login.css";

export const Login = () => {
  const { login } = useActions(authThunks);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      .catch((reason: { data: ResponseType; showGlobalError: boolean }) => {
        if (reason.data.fieldsErrors?.length === 0) {
          toast.error(getErorMessage(reason.data));
        }
        reason.data.fieldsErrors?.forEach((r) => {
          // @ts-ignore
          setError(r.field, { type: "value", message: r.error });
        });
      });
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
