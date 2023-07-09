import { toast } from "react-toastify";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { handleServerError505 } from "./server-error-505";
type Options = { showGlobalError?: boolean | undefined };

/**
 * A helper function for creating thunks that handle try/catch blocks and server errors.
 * @template T - The type of the value returned by the promise.
 * @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - The `thunkAPI` object provided by the Redux Toolkit `createAsyncThunk` function.
 * @param {() => Promise<T>} promise - A function that returns a Promise.
 * @param {Options} [options] - An optional object containing options for error handling.
 * @param {boolean} [options.showGlobalError=false] - A boolean indicating whether to show a global error message.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - A Promise that resolves to the value returned by the `promise` function, or rejects with an object containing an `error` property and an optional `showGlobalError` property.
 */

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
