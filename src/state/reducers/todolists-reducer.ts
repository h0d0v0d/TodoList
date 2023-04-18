import { Dispatch } from "redux"

import { todoListAPI } from '../../api/todolusts-api';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    addedDate: Date
    id: string
    order: number
    title: string
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: TodolistReducerActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return [...action.todoLists]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [action.newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id  ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
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
    addTodolistAC: (newTodoList: TodolistType) => ({type: 'ADD-TODOLIST', newTodoList} as const),
    changeTodolistTitleAC: (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const),
    changeTodolistFilterAC: (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
}

export const setTodoListsTC = () => (dispacth: Dispatch<TodolistReducerActionType>) => {
    todoListAPI.getTodoLists()
    .then((todoLists: TodolistType[]) => {
        dispacth(todoListReducerActions.setTodoListsAC(todoLists))
    })
}

export const createTodoListTC = (title: string) => (dispacth: Dispatch<TodolistReducerActionType>) => {
    todoListAPI
    .createTodoList(title)
    .then((res) => {
        const newTodoList = res.data.item
        dispacth(todoListReducerActions.addTodolistAC(newTodoList))
    })
}

export const deleteTodoListTC = (id: string) => (dispacth: Dispatch<TodolistReducerActionType>) => {
    todoListAPI
    .delteTodoList(id)
    .then((res) => {
        dispacth(todoListReducerActions.removeTodolistAC(id))
    })
}

export const changeTodoListTitleTC = (id: string, newTitle: string) => (dispacth: Dispatch<TodolistReducerActionType>) => {
    todoListAPI
    .updateTodoListTitle(id, newTitle)
    .then((res) => {
        dispacth(todoListReducerActions.changeTodolistTitleAC(id, newTitle))
    })
}

