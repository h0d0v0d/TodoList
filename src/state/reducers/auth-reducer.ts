import { todoListAPI } from "../../api/todolusts-api";
import { AppThunkType } from "../store";

type AuthStateType = typeof initialState;
const initialState = {
  isLoggedIn: null as null | false | true,
};

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthReducerActionsType
): AuthStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN": {
      return { ...state, isLoggedIn: action.value };
    }
    default:
      return state;
  }
};

export type AuthReducerActionsType = ReturnType<
  PropertiesType<typeof authReducerActions>
>;
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export const authReducerActions = {
  login: (value: boolean) =>
    ({ type: "login/SET-IS-LOGGED-IN", value } as const),
};

export const meTC = (): AppThunkType => async (dispatch) => {
  try {
    const res = await todoListAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(authReducerActions.login(true));
    }
  } catch {}
};

export const loginTC =
  (email: string, password: string): AppThunkType =>
  async (dispatch) => {
    try {
      const res = await todoListAPI.login(email, password);
      if (res.data.resultCode === 0) {
        dispatch(authReducerActions.login(true));
      }
    } catch {}
  };
