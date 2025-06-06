import {
  // useEffect,
  useReducer,
} from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  tasksReducer,
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  updateTaskAC,
} from "./reducers/tasksReducer";
import {
  todoListReducer,
  removeTodoListAC,
  updateTodoListAC,
  changeFilterAC,
  addTodoListAC,
} from "./reducers/todoListReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksType = {
  [key: string]: Array<TaskType>;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  const todolistID1: string = crypto.randomUUID();
  const todolistID2: string = crypto.randomUUID();

  // useReducer - React-хук для управления состояниями компонента
  // todoListReducer - функция, описывающая, как изменяются состояния
  // в ответ на определенные действия
  // todoLists - текущее состояние
  // dispatchTodoList - функция, отправляющая действие (action) редуктору

  const [todoLists, dispatchTodoList] = useReducer(todoListReducer, [
    { id: todolistID1, title: "What to leaarn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: crypto.randomUUID(), title: "HTML&CSS", isDone: false },
      { id: crypto.randomUUID(), title: "JS", isDone: false },
      { id: crypto.randomUUID(), title: "ReactJS", isDone: false },
      { id: crypto.randomUUID(), title: "Rest API", isDone: false },
      { id: crypto.randomUUID(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: crypto.randomUUID(), title: "Яблоки", isDone: false },
      { id: crypto.randomUUID(), title: "Груши", isDone: false },
      { id: crypto.randomUUID(), title: "Клубника", isDone: false },
      { id: crypto.randomUUID(), title: "Мандарины", isDone: false },
      { id: crypto.randomUUID(), title: "Апельсины", isDone: false },
    ],
  });

  const removeTask = (todoListId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todoListId, taskId));
  };

  const addTask = (todoListId: string, title: string) => {
    dispatchTasks(addTaskAC(todoListId, title));
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone));
  };

  const updateTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatchTasks(updateTaskAC(todoListId, taskId, newTitle));
  };

  // Функции, изменяющие состояние todoList
  const removeTodoList = (todoListId: string) => {
    dispatchTodoList(removeTodoListAC(todoListId));
    delete tasks[todoListId]; // удаляем ненужное (временное решение)
  };

  const changeFilter = (todoListId: string, value: FilterValuesType) => {
    dispatchTodoList(changeFilterAC(todoListId, value));
  };

  const updateTodoList = (todoListId: string, newTitle: string) => {
    dispatchTodoList(updateTodoListAC(todoListId, newTitle));
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatchTasks(action);
    dispatchTodoList(action);
  };

  // Отрисовка App

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ marginTop: "10px" }}>
          <AddItemForm onClickAdd={addTodoList} />
        </Grid>
        <Grid container style={{}}>
          {todoLists.map((el) => {
            return (
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  marginTop: "10px",
                  marginRight: "10px",
                  backgroundColor: "aqua",
                }}
              >
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
              </Paper>
            );
          })}
        </Grid>
      </Container>
      {/* <FunctionComp /> */}
    </div>
  );
}

export default App;

// const FunctionComp = () => {
//   const [size, setSize] = useState(10);

// useLayoutEffect(() => {
//   let start = new Date().getTime();
//   let end = start;
//   while (end < start + 3000) {
//     end = new Date().getTime();
//   }
//   setSize(300);
// });

//   useEffect(() => {
//     let start = new Date().getTime();
//     let end = start;
//     while (end < start + 1000) {
//       end = new Date().getTime();
//     }
//     setSize(30);
//   }, []);

//   return <div style={{ fontSize: size }}>FunctionComp</div>;
// };
