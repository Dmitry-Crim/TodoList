import "./App.css";
import { TodoListWithRedux } from "./components/TodoListWithRedux";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { addTodoListAC } from "./reducers/todoListReducer";
import { useSelector } from "react-redux";
import type { AppRootStateType } from "./store";
import { useDispatch } from "react-redux";

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
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists
  );

  const dispatch = useDispatch();

  const addTodoList = (title: string) => {
    dispatch(addTodoListAC(title));
  };

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
                <TodoListWithRedux todoList={el} />
              </Paper>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
