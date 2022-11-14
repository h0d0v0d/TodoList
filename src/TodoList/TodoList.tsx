import React, { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import Button from '../Button/Button'
import Title from '../Title/Title';
import { TodoListTaskType } from '../App/App';

import './todoList.css'

type TodoListPropsType = {
    tasks: Array<TodoListTaskType>,
    onDeletetask_1: Function,
    addNewTask: (text: string, newId: number) => void, 
    changeFilter: (newFilter: string) => void,
    toogleTask: Function,
    title: string
}

const TodoList = (props: TodoListPropsType) => {

    const [value, setValue] = useState('')
    const [show, setShow] = useState(true)

    const addNewTask = () => {
        props.addNewTask(value, 4)
        setValue('')
    }

    const changeShow = () => {
        setShow(show => !show)
    }

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
                            <TaskList tasks={props.tasks} onDeletetask_1={props.onDeletetask_1} toogleTask={props.toogleTask}/>
                        <div>
                            {['All', 'Active', 'Completed'].map((item: string, i: number) => {
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















