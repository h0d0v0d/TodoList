import { toast } from "react-toastify";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { getErorMessage } from "./getErrorMessage";
import { RejectValue } from "../../app/app.slice";

type Options = {
  showGlobalError?: boolean | undefined;
  rejectPayload?: {
    todoListId: string;
    taskId: string;
  };
};

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
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, RejectValue>,
  promise: () => Promise<T>,
  options?: Options
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { rejectWithValue } = thunkAPI;
  const showGlobalError = options?.showGlobalError ?? false;

  try {
    return await promise();
  } catch (e: any) {
    const errorText = getErorMessage(e);
    if (showGlobalError) {
      toast.error(errorText);
    }
    if (options?.rejectPayload) {
      return rejectWithValue({ error: errorText, showGlobalError, rejectData: options.rejectPayload });
    }
    return rejectWithValue({ error: errorText, showGlobalError });
  }
};
