import { isAxiosError } from "axios"

export const getErorMessage = (error: any): string => {
  let errorMessage = ""
  if (isAxiosError(error)) {
    errorMessage = error?.response?.data.error ?? error.message
    // ?? проверяет на null и undefined
  } else if (error instanceof Object && "message" in error) {
    errorMessage = `Native error ${error.meesage}`
  } else {
    errorMessage = JSON.stringify(error)
  }
  return errorMessage
}
