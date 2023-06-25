import { todoListAPI } from "../../api/todolusts-api";
// import { AppThunkType } from "../store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  addedDate: Date;
  id: string;
  order: number;
  title: string;
};

const initialState: TodolistType[] = [];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: TodoListsActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return [...action.todoLists];
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [action.newTodoList, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        console.log(`Меняем фильтер для ${action.id}`);
      }
      return [...state];
    }
    default:
      return state;
  }
};

export type TodoListsActionsType = ReturnType<
  PropertiesType<typeof todoListReducerActions>
>;
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export const todoListReducerActions = {
  setTodoListsAC: (todoLists: TodolistType[]) =>
    ({ type: "SET-TODOLISTS", todoLists } as const),
  removeTodolistAC: (todolistId: string) =>
    ({ type: "REMOVE-TODOLIST", id: todolistId } as const),
  addTodolistAC: (newTodoList: TodolistType) =>
    ({ type: "ADD-TODOLIST", newTodoList } as const),
  changeTodolistTitleAC: (id: string, title: string) =>
    ({ type: "CHANGE-TODOLIST-TITLE", id: id, title: title } as const),
  changeTodolistFilterAC: (id: string, filter: FilterValuesType) =>
    ({ type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter } as const),
};
/* 
export const setTodoListsTC = (): AppThunkType => async (dispacth) => {
  try {
    const todoLists: TodolistType[] = await todoListAPI.getTodoLists();
    dispacth(todoListReducerActions.setTodoListsAC(todoLists));
  } catch (e) {
    console.log("Произошла ошибка в setTodoListsTC");
    console.log(e);
  }
};

export const createTodoListTC =
  (title: string): AppThunkType =>
  async (dispacth) => {
    try {
      const res = await todoListAPI.createTodoList(title);
      const newTodoList: TodolistType = res.data.item;
      dispacth(todoListReducerActions.addTodolistAC(newTodoList));
    } catch (e) {
      console.log("Произошла ошибка в createTodoListTC");
      console.log(e);
    }
  };

export const deleteTodoListTC =
  (id: string): AppThunkType =>
  async (dispacth) => {
    try {
      const res = await todoListAPI.delteTodoList(id);
      dispacth(todoListReducerActions.removeTodolistAC(id));
    } catch (e) {
      console.log("Произошла ошибка в deleteTodoListTC");
      console.log(e);
    }
  };

export const changeTodoListTitleTC =
  (id: string, newTitle: string): AppThunkType =>
  async (dispacth) => {
    try {
      const res = await todoListAPI.updateTodoListTitle(id, newTitle);
      dispacth(todoListReducerActions.changeTodolistTitleAC(id, newTitle));
    } catch (e) {
      console.log("Произошла ошибка в changeTodoListTitleTC");
      console.log(e);
    }
  };
 */
