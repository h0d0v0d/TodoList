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
export type TodoListDataType = {
    id: string, 
    title: string,
    filter: TodoListFilterType,
    tasks: Array<TodoListTaskType>
    students: Array<string>
}

let todoLists: Array<TodoListDataType> = [
    {
        id: v1(),
        title: 'First todolist',
        filter: 'All',
        tasks: [    
            {id: v1(), title: 'HTML & Css', isDone: true}, 
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        students: [
            'Rick Kane',
            'Finnlay Bentley',
            'Samia North',
            'Isaac Morton',
            'Lily-Ann Clifford',
            'Thalia Park',
        ]
    }, 
    {
        id: v1(),
        title: 'Second todolist',
        filter: 'Active',
        tasks: [    
            {id: v1(), title: 'ООП', isDone: true}, 
            {id: v1(), title: 'Принципы solid', isDone: true},
            {id: v1(), title: 'CSS-3 анимации', isDone: false},
            {id: v1(), title: 'Рекурсия', isDone: false}
        ],
        students: [
            'Kylie Callaghan',
            'Star Wilks',
            'Marissa Colley',
            'Asa Fuller',
            'Leigh Kemp',
            'Avleen Dawson',
        ]
    }, 
    {
        id: v1(),
        title: 'Second todolist',
        filter: 'Active',
        tasks: [    
            
        ],
        students: [
            'Kylie Callaghan',
            'Star Wilks',
            'Marissa Colley',
            'Asa Fuller',
            'Leigh Kemp',
            'Avleen Dawson',
        ]
    }
]

function App() {

    const [todoListsData, setTodoListsData] = useState<Array<TodoListDataType>>(todoLists)

    const removeTaskList = (id: string) => {
        setTodoListsData(todoListsData.filter(t => t.id !== id))
    }

    const addNewTask = (title: string, todoListId: string) => {
        setTodoListsData(todoListsData.map(el => el.id === todoListId ? {...el, tasks: [...el.tasks, {id: v1(), title, isDone: false}]} : el))
    }

    const removeTask = (id: string, todoListId: string) => {
        setTodoListsData(todoListsData.map(el => el.id === todoListId ? {...el, tasks: el.tasks.filter(t => t.id !== id)} : el))
    }

    const toogleTask = (id: string, todoListId: string, newStatus: boolean) => {
        setTodoListsData(todoListsData.map(el => el.id === todoListId ? {...el, tasks: el.tasks.map(t => t.id === id ? {...t, isDone:newStatus} : t)} : el))
    }

    const changeFilter = (newFilter: TodoListFilterType, todoListId: string) => {
        setTodoListsData(todoListsData.map(el => el.id === todoListId ? {...el, filter: newFilter} : el))
    }

    const filteredTasks = (tasks: Array<any>, filter: TodoListFilterType) => {
        switch(filter) {
            case 'Completed': return tasks.filter(t => t.isDone)
            case 'Active': return tasks.filter(t => !t.isDone)
            default: return tasks
        } 
    }

    return (
        <div className="App">
                {
                    todoListsData.map((t) => {
                        return (
                            <TodoList key={t.id}
                                      todiListId={t.id}
                                      title={t.title}
                                      tasks={filteredTasks(t.tasks, t.filter)}
                                      filter={t.filter}
                                      students={t.students}
                                      toogleTask={toogleTask}
                                      removeTask={removeTask}
                                      addNewTask={addNewTask}
                                      changeFilter={changeFilter}
                                      removeTaskList={removeTaskList}/>
                        )
                    })
                }
        </div>
    );
}

export default App;
