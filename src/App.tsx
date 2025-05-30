import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  let todolistID1: string = crypto.randomUUID();
  let todolistID2: string = crypto.randomUUID();

  let [todoLists, setTodoList] = useState<TodoListType[]>([
    { id: todolistID1, title: "What to leaarn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: crypto.randomUUID(), title: "HTML&CSS", isDone: true },
      { id: crypto.randomUUID(), title: "JS", isDone: false },
      { id: crypto.randomUUID(), title: "ReactJS", isDone: true },
      { id: crypto.randomUUID(), title: "Rest API", isDone: false },
      { id: crypto.randomUUID(), title: "GraphQL", isDone: true },
    ],
    [todolistID2]: [
      { id: crypto.randomUUID(), title: "Яблоки", isDone: false },
      { id: crypto.randomUUID(), title: "Груши", isDone: true },
      { id: crypto.randomUUID(), title: "Клубника", isDone: false },
      { id: crypto.randomUUID(), title: "Мандарины", isDone: true },
      { id: crypto.randomUUID(), title: "Апельсины", isDone: false },
    ],
  });

  // Функции, изменяющие состояние tasks
  //
  const removeTask = (todoListId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((el) => el.id !== taskId),
    });
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((el) =>
        el.id === taskId ? { ...el, isDone: isDone } : el
      ),
    });
  };

  // Функции, изменяющие состояние todoList
  // Функция для удаления TodoList
  const removeTodoList = (todoListId: string) => {
    setTodoList(todoLists.filter((el) => el.id !== todoListId));
    delete tasks[todoListId]; // удаляем ненужное (временное решение)
  };

  // Фукция, изменяющая значение свойства filter
  const changeFilter = (todoListId: string, value: FilterValuesType) => {
    setTodoList(
      todoLists.map((el) =>
        el.id === todoListId ? { ...el, filter: value } : el
      )
    );
  };

  // Функция, добавляющая новый task
  const addTask = (todoListId: string, title: string) => {
    let newTask = { id: crypto.randomUUID(), title: title, isDone: false };
    setTasks({
      ...tasks,
      [todoListId]: [...tasks[todoListId], newTask],
    });
  };

  // Функция, создает новый TodoList
  const addTodoList = (title: string) => {
    const newId = crypto.randomUUID();
    const newTodo: TodoListType = {
      id: newId,
      title,
      filter: "all",
    };
    setTodoList([...todoLists, newTodo]);
    setTasks({
      ...tasks,
      [newId]: [],
    });
  };

  const updateTask = (todoListId: string, taskId: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((el) =>
        el.id === taskId ? { ...el, title: newTitle } : el
      ),
    });
  };

  const updateTodoList = (todoListId: string, newTitle: string) => {
    setTodoList(
      todoLists.map((el) =>
        el.id === todoListId ? { ...el, title: newTitle } : el
      )
    );
  };

  // Отрисовка App

  return (
    <div className="App">
      <AddItemForm onClickAdd={addTodoList} />
      {todoLists.map((el) => {
        return (
          <TodoList
            key={el.id}
            todoListId={el.id}
            tasks={tasks[el.id]}
            title={el.title}
            filter={el.filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
            updateTask={updateTask}
            updateTodoList={updateTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
