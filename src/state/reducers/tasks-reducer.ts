import { todoListAPI } from '../../api/todolusts-api';
import { AppActionType, AppThunkType } from '../store';

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

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: [...action.tasks, ...state[action.todoListId]]}
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
            return {...state, [action.newTodoList.id]: []}
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

export type TasksActionsType = ReturnType<PropertiesType<typeof tasksReducerActions>> 
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export const tasksReducerActions = {
    removeTaskAC: (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const),
    addTaskAC: (todolistId: string, newTask: TaskType) => ({type: 'ADD-TASK', newTask, todolistId} as const),
    changeTaskStatusAC: (todolistId: string, taskId: string, updatedTask: TaskType) => ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, updatedTask} as const),
    changeTaskTitleAC: (todolistId: string, taskId: string, task: TaskType) => ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, task} as const),
    setTasks: (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListId, tasks} as const),
}

export const setTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
    todoListAPI
    .getTasks(todoListId) 
    .then((res) => {
        const tasks = res
        dispatch(tasksReducerActions.setTasks(todoListId, tasks))
    })
}

export const createTaskTC = (title: string, todoListId: string): AppThunkType => (dispatch) => {
    todoListAPI
    .createTask(todoListId, title)
    .then((res) => {
        dispatch(tasksReducerActions.addTaskAC(todoListId, res.data.item))
    })
}

export const deleteTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    todoListAPI
    .deleteTask(todoListId, taskId)
    .then((res) => {
        dispatch(tasksReducerActions.removeTaskAC(todoListId, taskId))
    })
}

export const updateTaskTitleTC = (todoListId: string, taskId: string, newTitle: string): AppThunkType => (dispatch) => {
    todoListAPI
    .updateTaskTitle(todoListId, taskId, newTitle)
    .then((res) => {
        const task = res.data.item
        dispatch(tasksReducerActions.changeTaskTitleAC(todoListId, taskId, task))
    })
}

export const updateTaskStatusTC = (todoListId: string, taskId: string, newStatus: number): AppThunkType => (dispatch, getState) => {
    const taskTitle = getState().tasks[todoListId].find(t => t.id === taskId)?.title!
    todoListAPI
    .updateTaskStatus(todoListId, taskId, taskTitle, newStatus)
    .then((res) => {
        const task = res.data.item
        dispatch(tasksReducerActions.changeTaskStatusAC(todoListId, taskId, task))
    })
}




