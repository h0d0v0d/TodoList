import React, { ChangeEvent } from 'react';

import {TodoListTaskType} from '../App/App'

import './taskList.css'

type TaskListPropsType = {
    tasks: Array<TodoListTaskType>,
    onRemoveTask: (id: string) => void,
    onToogleTask: (id: string, newStatus: boolean) => void
}

const TaskList: React.FC<TaskListPropsType> = (props) => {
    return (
        <ul>
            {
                props.tasks.map((task: TodoListTaskType) => {
                    const {id, isDone, title} = task
                    const onRemoveTask = () => { props.onRemoveTask(id) }
                    const onToogleTask = (e: ChangeEvent<HTMLInputElement>) => { props.onToogleTask(id, e.currentTarget.checked) }
                    return (
                        <li key={id} className='task-item' >
                            <div className={isDone ? 'unactive-task' : ''}>
                                <input type="checkbox"  
                                    checked={isDone}  
                                    onChange={onToogleTask} /> 
                                <span>{title}</span>
                            </div>
                            <button className='delete-task-button' onClick={onRemoveTask}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default TaskList;