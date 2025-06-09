import { tasksReducer } from "./reducers/tasksReducer";
import { todoListReducer } from "./reducers/todoListReducer";
import { combineReducers, legacy_createStore } from "redux";

// объединяя редьюсеры с помощью combineReducers,
// мы задаем структуру нашего единственного объекта состояния
const rootReduser = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer,
});
// создаем store
export const store = legacy_createStore(rootReduser);

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReduser>;

// чтобы можно было в консоли браузера обращаться к store в любой момент
// window.store = store;
