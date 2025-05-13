import React, { type JSX } from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
  }

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => { 

// const TodoList: React.FC<TodoListPropsType> = ({title, tasks, removeTask}) => {  
// функциональная компонента, функция возвращает JSX разметку

    const {title, tasks, removeTask} = props; 

    // одноименным переменным присваиваются одноименные ключи объекта
    // const title = props.title;   
    // const tasks = props.tasks;

    // const listItems: Array<JSX.Element> = [];    
    // let tasksList: Array<JSX.Element> | JSX.Element;
    // if (tasks.length === 0) {
    //     tasksList = <span>Your taskList is empty</span>
    // } else {
    //     for (let i = 0; i < tasks.length; i++) {
    //         const newListItems = <li key = {tasks[i].id}>
    //             <input type="checkbox" checked={tasks[i].isDone} /> <span>{tasks[i].title}</span>
    //             <button>x</button> 
    //         </li>
    //         listItems.push(newListItems)
    //     }   
    //     tasksList = <ul>
    //         {listItems}
    //     </ul>     
    // }

    const listItems: Array<JSX.Element> = tasks.map(t => {
        
        const onClickRemoveTaskHandler = () => removeTask(t.id)
        return (
            <li key = {t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
    
    const tasksList: JSX.Element = tasks.length      
        ? <ul>{listItems}</ul>
        : <span>Your taskList is empty</span>

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
                {tasksList}  
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
      </div>      
    )
}

export default TodoList;  // разрешили использовать TodoList во внешнем мире