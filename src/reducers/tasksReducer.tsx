import type { TasksType } from "../App";
import type { AddTodoListACType } from "./todoListReducer";

export type GeneralTasksType =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | UpdateTaskACType
  | AddTodoListACType;

const initialState: TasksType = {};

export const tasksReducer = (
  state = initialState,
  action: GeneralTasksType
): TasksType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (el) => el.id !== action.payload.taskId
        ),
      };
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: [
          ...state[action.payload.todoListId],
          {
            id: crypto.randomUUID(),
            title: action.payload.title,
            isDone: false,
          },
        ],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(
          (el) =>
            el.id === action.payload.taskId
              ? { ...el, isDone: action.payload.isDone }
              : el
        ),
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(
          (el) =>
            el.id === action.payload.taskId
              ? { ...el, title: action.payload.newTitle }
              : el
        ),
      };
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todoListId]: [] };
    }
    default:
      return state;
  }
};

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>;
// export type AddTodoListTasksAC = ReturnType<typeof addTodoListTasksAC>;

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todoListId,
      taskId,
    },
  } as const;
};

export const addTaskAC = (todoListId: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListId,
      title,
    },
  } as const;
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todoListId,
      taskId,
      isDone,
    },
  } as const;
};

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  newTitle: string
) => {
  return {
    type: "UPDATE-TASK",
    payload: {
      todoListId,
      taskId,
      newTitle,
    },
  } as const;
};
