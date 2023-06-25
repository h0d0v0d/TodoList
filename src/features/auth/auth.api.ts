import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const authAPI = {
  me() {
    return instance.get<MeResponse>("auth/me");
  },
  login(args: LoginArgs) {
    return instance.post<LoginResponse>("auth/login", args);
  },
  logout() {
    return instance.delete("auth/login");
  },
};

export type User = {
  userId: number;
  email: string;
  login: string;
};

// Me
type MeResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: User;
};

// Login
export type LoginArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};

// LoginResponse

type LoginResponse = {
  data: { userId: number };
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};
