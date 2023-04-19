import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatchType, AppRootStateType } from "../state/store";
import { useSelector } from "react-redux";

export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector