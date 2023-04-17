import { todoListReducerActions } from './todolists-reducer';
import { Dispatch } from "redux"
import { todoListAPI } from '../api/todolusts-api';
import { AppRootStateType } from './store';
const { setTodoListsAC, addTodolistAC, removeTodolistAC } = todoListReducerActions

export type TaskType = {
    addedDate: Date,
    deadline: Date | null,
    description: string | null,
    id: string,
    order: number,
    priority: number,
    startDate: Date | null,
    status: number,
    title: string,
    todoListId: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.tasks[0].todoListId]: [...action.tasks, ...state[action.tasks[0].todoListId]]}
        }   
        case 'SET-TODOLISTS': {
            return action.todoLists.reduce((acc, tl) => ({...acc, [tl.id]: []}), {})
        }  
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.todolistId]: [action.newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? action.updatedTask : t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistId]: state[action.todolistId].map((t) => t.id === action.taskId ? action.task : t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

type TasksReducerActionType = ReturnType<PropertiesType<typeof tasksReducerActions>> 
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export const tasksReducerActions = {
    removeTaskAC: (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const),
    addTaskAC: (todolistId: string, newTask: TaskType) => ({type: 'ADD-TASK', newTask, todolistId} as const),
    changeTaskStatusAC: (todolistId: string, taskId: string, updatedTask: TaskType) => ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, updatedTask} as const),
    changeTaskTitleAC: (todolistId: string, taskId: string, task: TaskType) => ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, task} as const),
    setTasks: (tasks: TaskType[]) => ({type: 'SET-TASKS', tasks} as const),
    addTodolistAC,
    removeTodolistAC,
    setTodoListsAC 
}

export const setTasksTC = (todoListId: string) => (dispatch: Dispatch<TasksReducerActionType>) => {
    todoListAPI
    .getTasks(todoListId)
    .then((res) => {
        const tasks = res
        dispatch(tasksReducerActions.setTasks(tasks))
    })
}

export const createTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<TasksReducerActionType>) => {
    todoListAPI
    .createTask(todoListId, title)
    .then((res) => {
        dispatch(tasksReducerActions.addTaskAC(todoListId, res.data.item))
    })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<TasksReducerActionType>) => {
    todoListAPI
    .deleteTask(todoListId, taskId)
    .then((res) => {
        dispatch(tasksReducerActions.removeTaskAC(todoListId, taskId))
    })
}

export const updateTaskTitleTC = (todoListId: string, taskId: string, newTitle: string) => (dispatch: Dispatch<TasksReducerActionType>) => {
    todoListAPI
    .updateTaskTitle(todoListId, taskId, newTitle)
    .then((res) => {
        const task = res.data.item
        dispatch(tasksReducerActions.changeTaskTitleAC(todoListId, taskId, task))
    })
}

export const updateTaskStatusTC = (todoListId: string, taskId: string, newStatus: number) => (dispatch: Dispatch<TasksReducerActionType>, getState: () => AppRootStateType) => {
    const taskTitle = getState().tasks[todoListId].find(t => t.id === taskId)?.title!
    todoListAPI
    .updateTaskStatus(todoListId, taskId, taskTitle, newStatus)
    .then((res) => {
        const task = res.data.item
        dispatch(tasksReducerActions.changeTaskStatusAC(todoListId, taskId, task))
    })
}




