import React from 'react';
import { useState, useEffect} from 'react';
import { v1 } from 'uuid';

import TodoList from '../TodoList/TodoList';

import './App.css';

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

function App() {

    const [tasks_1, setTasks_1] = useState<Array<TodoListTaskType>>(tasks)
    const [filter, setFilter] = useState<TodoListFilterType>('All')
    const [filterTasks, setFilterTasks] = useState<Array<TodoListTaskType>>(tasks_1)

    const onAddNewTask = (title: string) => {
        return setTasks_1([{id: v1(), title, isDone: false}, ...tasks_1])
    }

    const onRemoveTask = (id: string) => {
        return setTasks_1(tasks_1.filter(t => t.id !== id))
    }

    const onToogleTask = (id: string) => {
        return setTasks_1(tasks_1.map(t => t.id === id ? {...t, isDone: !t.isDone} : t))
    }

    const onChangeFilter = (newFilter: TodoListFilterType) => {
        return setFilter(newFilter) 
    }

    const filteredTasks = () => {
        switch(filter) {
            case 'Completed': return setFilterTasks(tasks_1.filter(t => t.isDone))
            case 'Active': return setFilterTasks(tasks_1.filter(t => !t.isDone))
            default: return setFilterTasks(tasks_1)
        }
    }

    useEffect(() => {
        filteredTasks()
    }, [filter, tasks_1])

    return (
        <div className="App">
                <TodoList title={'What to learn'}
                          tasks={filterTasks}
                          onToogleTask={onToogleTask}
                          onRemoveTask={onRemoveTask}
                          onAddNewTask={onAddNewTask}
                          onChangeFilter={onChangeFilter}
                          filter={filter}/>
        </div>
    );
}

export default App;
