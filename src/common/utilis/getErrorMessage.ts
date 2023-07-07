import { AxiosError, isAxiosError } from "axios";

export type ErrorType = any;

export const getErorMessage = (error: ErrorType): string => {
  let errorMessage = "";
  if (isAxiosError(error)) {
    errorMessage = error?.response?.data.error ?? error.message;
    // ?? проверяет на null и undefined
  } else if (error instanceof Object && "message" in error) {
    errorMessage = `Native error ${error.message}`;
  } else if (error instanceof Object && "messages" in error) {
    errorMessage = error.messages[0];
  } else {
    errorMessage = JSON.stringify(error);
  }
  return errorMessage;
};
