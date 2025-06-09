import type { Reducer } from "react";
import type { FilterValuesType, TodoListType } from "../App";

export type TodoListReducerType =
  | RemoveTodoListACType
  | UpdateTodoListACType
  | ChangeFilterACType
  | AddTodoListACType;

const initialState: TodoListType[] = [];

export const todoListReducer: Reducer<TodoListType[], TodoListReducerType> = (
  state = initialState,
  action: TodoListReducerType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.todoListId);
    }
    case "UPDATE-TODOLIST": {
      return state.map((el) =>
        el.id === action.payload.todoListId
          ? { ...el, title: action.payload.newTitle }
          : el
      );
    }
    case "CHANGE-FILTER-TODOLIST": {
      return state.map((el) =>
        el.id === action.payload.todoListId
          ? { ...el, filter: action.payload.value }
          : el
      );
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.payload.todoListId,
          title: action.payload.title,
          filter: "all",
        },
      ];
    }
    default:
      return state;
  }
};

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>;
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;

export const removeTodoListAC = (todoListId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todoListId,
    },
  } as const;
};

export const updateTodoListAC = (todoListId: string, newTitle: string) => {
  return {
    type: "UPDATE-TODOLIST",
    payload: {
      todoListId,
      newTitle,
    },
  } as const;
};

export const changeFilterAC = (todoListId: string, value: FilterValuesType) => {
  return {
    type: "CHANGE-FILTER-TODOLIST",
    payload: {
      todoListId,
      value,
    },
  } as const;
};

export const addTodoListAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todoListId: crypto.randomUUID(),
    },
  } as const;
};
