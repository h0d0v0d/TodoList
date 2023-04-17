import { tasksReducer } from './tasks-reducer';
import thunkMiddleware  from "redux-thunk";
import { todolistsReducer } from './todolists-reducer';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { useDispatch } from 'react-redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const useAppDispatch = useDispatch<AppDispatchType>
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

