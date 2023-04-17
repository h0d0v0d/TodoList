import { v1 } from 'uuid';
import { Dispatch } from "redux"
import { todoListAPI } from '../api/todolusts-api';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    addedDate: Date
    id: string
    order: number
    title: string
}

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: TodolistReducerActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return [...action.todoLists]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                addedDate: new Date(),
                id: action.todolistId,
                order: 12,
                title: action.title,
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                /* todolist.filter = action.filter; */
                console.log(`Меняем фильтер для ${action.id}`)
            }
            return [...state]
        }
        default:
            return state;
    }
}

type TodolistReducerActionType = ReturnType<PropertiesType<typeof todoListReducerActions>> 
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export const todoListReducerActions = {
    setTodoListsAC: (todoLists: TodolistType[]) => ({type: 'SET-TODOLISTS', todoLists} as const),
    removeTodolistAC: (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const),
    addTodolistAC: (title: string) => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const),
    changeTodolistTitleAC: (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const),
    changeTodolistFilterAC: (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
}

export const setTodoListsTC = () => (dispacth: Dispatch<TodolistReducerActionType>) => {
    console.log('thunk')
    todoListAPI.getTodoLists()
    .then((todoLists: TodolistType[]) => {
        dispacth(todoListReducerActions.setTodoListsAC(todoLists))
        console.log(todoLists)
    })
}

