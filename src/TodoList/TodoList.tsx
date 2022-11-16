import React, { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import Button from '../Button/Button'
import Title from '../Title/Title';
import { TodoListTaskType, TodoListFilterType } from '../App/App';

import './todoList.css'  
import { v1 } from 'uuid';

type TodoListPropsType = {
    tasks: Array<TodoListTaskType>,
    removeTask: (id: string) => void,
    addNewTask: (text: string) => void, 
    changeFilter: (newFilter: TodoListFilterType) => void,
    toogleTask: Function,
    title: string
}

const TodoList = (props: TodoListPropsType) => {

    const [value, setValue] = useState<string>('')
    const [newId, setNewId] = useState<number>(4)
    const [show, setShow] = useState<boolean>(true)

    const addNewTask = () => {
        props.addNewTask(value)
        return setValue('')
    }

    const changeShow = () => {
        return setShow(show => !show)
    }

    const buttonData: Array<TodoListFilterType> = ['All', 'Active', 'Completed']

    return (
        <div >
            <div>
                <Title title={props.title}/>
                {   
                    show && 
                    <>
                        <div>
                            <input onChange={(e) => {setValue(e.currentTarget.value)}} value={value}/>
                            <button onClick={addNewTask} >Добавить task</button>
                        </div> 
                            <TaskList tasks={props.tasks} removeTask={props.removeTask} toogleTask={props.toogleTask}/>
                        <div>
                            {
                                buttonData.map((item: TodoListFilterType, i: number) => {
                                    return <Button key={i} 
                                                name={item} 
                                                changeFilter={props.changeFilter}/>
                            })}
                        </div>
                    </>
                }
                <button onClick={changeShow} className='show-button'>{show ? 'Hide': 'Show'}</button>
            </div>
        </div>
    );
};

export default TodoList;















