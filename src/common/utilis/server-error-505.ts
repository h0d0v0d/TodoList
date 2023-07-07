import { appActions } from "../../app/app.slice";
import { AppDispatch } from "../../app/store";

export const handleServerError505 = (dispatch: AppDispatch) => {
  dispatch(appActions.setAppError({ error: "505" }));
};
