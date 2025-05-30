import React, { type ChangeEvent, type JSX } from "react";
import type { FilterValuesType, TaskType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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

  const listItems: Array<JSX.Element> = tasksFiltred.map((t) => {
    const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
      changeTaskStatus(todoListId, t.id, event.currentTarget.checked);

    return (
      <li key={t.id}>
        <input
          type="checkbox"
          onChange={onChangeTaskStatusHandler}
          checked={t.isDone}
        />
        <EditableSpan
          oldTitle={t.title}
          onClickAdd={(newTitle: string) => updateTaskHandler(t.id, newTitle)}
        />
        <button onClick={() => removeTask(todoListId, t.id)}>x</button>
      </li>
    );
  });

  const tasksList: JSX.Element = tasksFiltred.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>Your taskList is empty</span>
  );

  // Функция принимает title и запускает функцию addTask, переданную из App.tsx,
  // которая добаляет новый task в указанном todoListID
  // Эту функцию мы передаем в AddItemForm
  const addTaskHandler = (title: string) => {
    addTask(todoListId, title);
  };

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todoListId, newTitle);
  };

  // Отрисовка TodoList
  const removeTodoListHandler = () => removeTodoList(todoListId);
  return (
    <div className="todoList">
      <h3>
        <EditableSpan oldTitle={title} onClickAdd={updateTodoListHandler} />
        <button onClick={removeTodoListHandler}>x</button>
      </h3>
      <AddItemForm onClickAdd={addTaskHandler} />
      {tasksList}
      <div>
        <button
          className={filter === "all" ? "btn-active" : undefined}
          onClick={() => changeFilter(todoListId, "all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "btn-active" : undefined}
          onClick={() => changeFilter(todoListId, "active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "btn-active" : undefined}
          onClick={() => changeFilter(todoListId, "completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
