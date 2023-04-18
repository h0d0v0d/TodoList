import thunkMiddleware  from "redux-thunk";
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import { useDispatch } from 'react-redux';

import { tasksReducer } from './reducers/tasks-reducer';
import { todolistsReducer } from './reducers/todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer, 
    todolists: todolistsReducer
})

export const useAppDispatch = useDispatch<AppDispatchType>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

