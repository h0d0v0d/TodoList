import { toast } from "react-toastify";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { handleServerError505 } from "./server-error-505";
type Options = { showGlobalError?: boolean | undefined };

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: () => Promise<T>,
  options?: Options
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const showGlobalError = options?.showGlobalError ?? false;

  try {
    return await promise();
  } catch (e: any) {
    handleServerError505(dispatch);
    toast.error("505");
    return rejectWithValue({ error: e, showGlobalError });
  }
};
