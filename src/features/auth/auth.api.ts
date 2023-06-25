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
    return instance.post("auth/login", args);
  },
};

// Me
type MeResponse = {
  resultCode: number;
  messages: string[];
  data: {
    userId: number;
  };
};

// Login
export type LoginArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
