import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { RejectValue } from "../../app/app.slice";

/**
 * A wrapper function for `createAsyncThunk` that sets the `thunkAPI` type to include `state`, `dispatch`, and `rejectValue` properties.
 * @returns {ReturnType<typeof createAsyncThunk>} - The `createAsyncThunk` function with the `thunkAPI` type set to include `state`, `dispatch`, and `rejectValue` properties.
 */

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectValue;
  }>();
