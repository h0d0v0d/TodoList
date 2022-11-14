import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';
import TodoList from '../TodoList/TodoList';

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
    const [filter, setFilter] = useState('all')
    const [filterTasks, setFilterTasks] = useState(tasks_1)
    const todoListTitle_1 = 'What to learn'

    const addNewTask = (text: string, newId: number ) => {
        setTasks_1([...tasks_1, {id: newId, title: text, isDone: false}])
    }

    const onDeletetask_1 = (id: number) => {
        setTasks_1(tasks_1.filter(item => item.id !== id))
    }

    const toogleTask = (id: number) => {
        let newTasks_1 = tasks_1.map(i => i.id === id ? {...i, isDone: !i.isDone} : i)
        setTasks_1(newTasks_1)
    }

    const changeFilter = (newFilter: string) => {
        setFilter(newFilter) 
    }

    const onFilterTasks = () => {
        if (filter === 'Completed') {
            return setFilterTasks(tasks_1.filter(item => item.isDone))
        } else if (filter === 'Active') {
            return setFilterTasks(tasks_1.filter(item => !item.isDone))
        } else {
            return setFilterTasks(tasks_1)
        }
    }

    useEffect(() => {
        onFilterTasks()
    }, [filter, tasks_1])

    return (
        <div className="App">

                <TodoList tasks={filterTasks}
                          onDeletetask_1={onDeletetask_1}
                          addNewTask={addNewTask}
                          changeFilter={changeFilter}
                          toogleTask={toogleTask}
                          title={todoListTitle_1}/>
        </div>
    );
}

export default App;
