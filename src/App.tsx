import './App.css';
import TodoList, { type TaskType } from './TodoList';




function App() {

  const todoListTitle_1: string = "What to learn";    // типизируем переменную, тип переменной - строка
  const todoListTitle_2: string = "What to buy";

  const tasks_1: Array<TaskType> = [          // массив элементов типа TaskType
    {id: 1, isDone: true, title: 'HTML&CSS'},
    {id: 2, isDone: true, title: 'JS&TS'},
    {id: 3, isDone: false, title: 'React'},
    {id: 4, isDone: true, title: 'REDUX'},
  ]

  const tasks_2: Array<TaskType> = [          // массив элементов типа TaskType
    {id: 5, isDone: false, title: 'Bread'},
    {id: 6, isDone: false, title: 'Chocolater'},
    {id: 7, isDone: true, title: 'Tea'},
    {id: 8, isDone: false, title: 'Coffee'},
  ]

  return (
    <div className="App">
      <TodoList 
        tasks = {tasks_1}   
        title = {todoListTitle_1}
        />
      <TodoList 
        tasks = {tasks_2}
        title = {todoListTitle_2}
        />
      
    </div>
      
  )
}
  

export default App;
