import React, { type JSX } from "react";
import type { FilterValuesType, TaskType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { SuperCheckbox } from "./SuperCheckbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, value: FilterValuesType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeTaskStatus: (
    todoListId: string,
    taskId: string,
    newIsDoneValue: boolean
  ) => void;
  removeTodoList: (todoListId: string) => void;
  updateTask: (todoListId: string, taskId: string, newTitle: string) => void;
  updateTodoList: (todoListId: string, newTitle: string) => void;
};

const TodoList: React.FC<TodoListPropsType> = ({
  todoListId,
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  removeTodoList,
  updateTask,
  updateTodoList,
}) => {
  let tasksFiltred = tasks;
  if (filter === "active") {
    tasksFiltred = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasksFiltred = tasks.filter((t) => t.isDone === true);
  }

  const updateTaskHandler = (tId: string, newTitle: string) => {
    updateTask(todoListId, tId, newTitle);
  };

  const onChangeTaskStatusHandler = (tId: string, isDone: boolean) =>
    changeTaskStatus(todoListId, tId, isDone);

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
          onClick={() => removeTask(todoListId, t.id)}
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
    addTask(todoListId, title);
  };

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todoListId, newTitle);
  };

  const removeTodoListHandler = () => removeTodoList(todoListId);
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
          onClick={() => changeFilter(todoListId, "all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="primary"
          onClick={() => changeFilter(todoListId, "active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={() => changeFilter(todoListId, "completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
