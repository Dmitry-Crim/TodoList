import { useState } from 'react';
import './App.css';
import TodoList, { type TaskType } from './TodoList';


function App() {

  const todoListTitle_1: string = "What to learn";    
  // const todoListTitle_2: string = "What to buy";

  const [tasks, setTasks] = useState<Array<TaskType>>([ 
    {id: 1, isDone: true, title: 'HTML&CSS'},
    {id: 2, isDone: true, title: 'JS&TS'},
    {id: 3, isDone: false, title: 'React'},
    {id: 4, isDone: true, title: 'REDUX'},
  ])

  console.log(tasks)
  const removeTask = (taskId: number) => {
    const nextState: Array<TaskType> = []
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== taskId) {
        nextState.push(tasks[i])
      }
    }
    console.log(nextState)
    setTasks(nextState)
  }

  // const tasks_1: Array<TaskType> = [
  //   {id: 1, isDone: true, title: 'HTML&CSS'},
  //   {id: 2, isDone: true, title: 'JS&TS'},
  //   {id: 3, isDone: false, title: 'React'},
  //   {id: 4, isDone: true, title: 'REDUX'},
  // ]

  // const tasks_2: Array<TaskType> = [          
  //   {id: 5, isDone: false, title: 'Bread'},
  //   {id: 6, isDone: false, title: 'Chocolater'},
  //   {id: 7, isDone: true, title: 'Tea'},
  //   {id: 8, isDone: false, title: 'Coffee'},
  // ]

  return (
    <div className="App">
      <TodoList 
        tasks = {tasks}   
        title = {todoListTitle_1}
        removeTask={removeTask}
        />
      {/* <TodoList 
        tasks = {tasks_2}
        title = {todoListTitle_2}
        removeTask={removeTask}
        />       */}
    </div>      
  )
}  

export default App;
