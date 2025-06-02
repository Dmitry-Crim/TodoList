import type { FilterValuesType, TodoListType } from "../App";

export const todoListReducer = (
  state: TodoListType[],
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
        { id: action.payload.id, title: action.payload.title, filter: "all" },
      ];
    }
    default:
      return state;
  }
};

type TodoListReducerType =
  | RemoveTodoListACType
  | UpdateTodoListACType
  | ChangeFilterACType
  | AddTodoListACType;
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
type AddTodoListACType = ReturnType<typeof addTodoListAC>;

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

export const addTodoListAC = (title: string, id: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      id,
    },
  } as const;
};
