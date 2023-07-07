import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const authAPI = {
  me() {
    return instance.get<ResponseType<User>>("auth/me");
  },
  login(args: LoginArgs) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", args);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};

export type User = {
  userId: number;
  email: string;
  login: string;
};

type FieldError = {
  error: string;
  field: string;
};

export type ResponseType<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: FieldError[];
  resultCode: number;
};

// Login
export type LoginArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
