import React from 'react';
import { useState, useEffect } from 'react';
import { v1 } from 'uuid';

import './App.css';
import TodoList from '../TodoList/TodoList';

export type TodoListFilterType = 'All' | 'Active' | 'Completed'

export type TodoListTaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

let tasks: Array<TodoListTaskType> = [
    {
        id: v1(),
        title: 'HTML & Css',
        isDone: true
    },
    {
        id: v1(),
        title: 'Js',
        isDone: true
    },
    {
        id: v1(),
        title: 'React',
        isDone: false
    },
]
const todoListTitle_1 = 'What to learn'

function App() {

    const [tasks_1, setTasks_1] = useState<Array<TodoListTaskType>>(tasks)
    const [filter, setFilter] = useState<TodoListFilterType>('All')
    const [filterTasks, setFilterTasks] = useState<Array<TodoListTaskType>>(tasks_1)

    const addNewTask = (text: string) => {
        return setTasks_1([...tasks_1, {id: v1(), title: text, isDone: false}])
    }

    const removeTask = (id: string) => {
        return setTasks_1(tasks_1.filter(item => item.id !== id))
    }

    const toogleTask = (id: string) => {
        return setTasks_1(tasks_1.map(i => i.id === id ? {...i, isDone: !i.isDone} : i))
    }

    const changeFilter = (newFilter: TodoListFilterType) => {
        return setFilter(newFilter) 
    }

    const onFilterTasks = () => {
        switch(filter) {
            case 'Completed': return setFilterTasks(tasks_1.filter(item => item.isDone))
            case 'Active': return setFilterTasks(tasks_1.filter(item => !item.isDone))
            default: return setFilterTasks(tasks_1)
        }
    }

    useEffect(() => {
        onFilterTasks()
    }, [filter, tasks_1])

    return (
        <div className="App">
                <TodoList title={todoListTitle_1}
                          tasks={filterTasks}
                          toogleTask={toogleTask}
                          removeTask={removeTask}
                          addNewTask={addNewTask}
                          changeFilter={changeFilter}
                />
        </div>
    );
}

export default App;
