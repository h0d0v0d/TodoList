import React from 'react';
import { useState } from 'react';
import './App.css';

import TodoList from './TodoList';

export type TodoListTaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

let tasks: Array<TodoListTaskType> = [
    {
        id: 1,
        title: 'HTML & Css',
        isDone: true
    },
    {
        id: 2,
        title: 'Js',
        isDone: true
    },
    {
        id: 3,
        title: 'React',
        isDone: false
    },
]


function App() {

    const [tasks_1, setTasks_1] = useState(tasks)
    const todoListTitle_1 = 'What to learn'

    const onDeletetask_1 = (id: number) => {
        setTasks_1(tasks_1 => tasks_1.filter((item) => {return item.id !== id}))
    }
    
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={tasks_1}
                      onDeletetask_1={onDeletetask_1}/>
        </div>
    );
}

export default App;
