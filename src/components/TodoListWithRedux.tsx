import React, { type JSX } from "react";
import type { AppRootStateType } from "../store";
import type { TaskType, TodoListType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { SuperCheckbox } from "./SuperCheckbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  changeFilterAC,
  removeTodoListAC,
  updateTodoListAC,
} from "../reducers/todoListReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  updateTaskAC,
} from "../reducers/tasksReducer";

type TodoListPropsType = {
  todoList: TodoListType;
};

export const TodoListWithRedux: React.FC<TodoListPropsType> = ({
  todoList,
}) => {
  const { id, title, filter } = todoList;

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  );

  const dispatch = useDispatch();

  let tasksFiltred = tasks;
  if (filter === "active") {
    tasksFiltred = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasksFiltred = tasks.filter((t) => t.isDone === true);
  }

  const updateTaskHandler = (tId: string, newTitle: string) => {
    dispatch(updateTaskAC(id, tId, newTitle));
  };

  const onChangeTaskStatusHandler = (tId: string, isDone: boolean) =>
    dispatch(changeTaskStatusAC(id, tId, isDone));

  const listItems: Array<JSX.Element> = tasksFiltred.map((t) => {
    return (
      <li key={t.id}>
        <SuperCheckbox
          isDone={t.isDone}
          callBack={(isDone) => onChangeTaskStatusHandler(t.id, isDone)}
        />
        <EditableSpan
          oldTitle={t.title}
          onClickAdd={(newTitle: string) => updateTaskHandler(t.id, newTitle)}
        />
        <IconButton
          onClick={() => dispatch(removeTaskAC(id, t.id))}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </li>
    );
  });

  const tasksList: JSX.Element = tasksFiltred.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>Your taskList is empty</span>
  );

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC(id, title));
  };

  const updateTodoListHandler = (title: string) => {
    dispatch(updateTodoListAC(id, title));
  };

  const removeTodoListHandler = () => dispatch(removeTodoListAC(id));

  // Отрисовка TodoList
  return (
    <div className="todoList">
      <h3>
        <EditableSpan oldTitle={title} onClickAdd={updateTodoListHandler} />
        <IconButton onClick={removeTodoListHandler} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm onClickAdd={addTaskHandler} />
      {tasksList}
      <div>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={() => dispatch(changeFilterAC(id, "all"))}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="primary"
          onClick={() => dispatch(changeFilterAC(id, "active"))}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={() => dispatch(changeFilterAC(id, "completed"))}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
