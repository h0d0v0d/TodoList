import axios from "axios"
import { TaskType } from "../state/tasks-reducer"

type TodoListType = {
    addedDate: Date,
    id: string,
    order: number,
    title: string
}

type TaskResponseType ={
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

type ResponseType<T> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/', 
    withCredentials: true
})

export const todoListAPI = {
    getTodoLists () {
        return instance.get<TodoListType[]>(`todo-lists`).then(res => res.data)
    },
    createTodoList (title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>(`todo-lists`, {title}).then(res => res.data)
    },
    delteTodoList (todoListID: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoListID}`).then(res => res.data)
    },
    updateTodoList (todoListID: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoListID}`, {title}).then(res => res.data)
    },
    getTasks (todoListID: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todoListID}/tasks`).then(res => res.data.items)
    },
    createTask (todoListId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title}).then(res => res.data)
    },
    updateTaskTitle (todoListId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, {title}).then(res => res.data)
    },
    updateTaskStatus(todoListId: string, taskId: string, title: string, status: number) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, {title, status}).then(res => res.data)
    },
    deleteTask (todoListId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoListId}/tasks/${taskId}`).then(res => res.data)
    }
}

