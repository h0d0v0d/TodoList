import { isAxiosError } from "axios";
import { ResponseType } from "../../features/auth/auth.api";

export type ErrorType = any;

export const getErorMessage = (error: ResponseType | string): string => {
  let errorMessage = "";
  if (isAxiosError(error)) {
    errorMessage = `Code: ${error?.response?.status}` ?? error.message;
    // ?? проверяет на null и undefined
  } else if (error instanceof Object && "messages" in error) {
    errorMessage = error.messages[0];
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = JSON.stringify(error) ?? "Network error";
  }
  return errorMessage;
};
