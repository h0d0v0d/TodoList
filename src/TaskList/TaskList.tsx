import React from 'react';

import {TodoListTaskType} from '../App/App'

type TaskListPropsType = {
    tasks: Array<TodoListTaskType>,
    onRemoveTask: (id: string) => void,
    onToogleTask: Function
}

const TaskList: React.FC<TaskListPropsType> = (props) => {
    return (
        <ul>
            {
                props.tasks.map((task: TodoListTaskType) => {
                    const {id, isDone, title} = task
                    return (
                        <li key={id} style={isDone ? {opacity: '0.5'} : {opacity: '1'}} >
                            <input type="checkbox" 
                                   checked={isDone} 
                                   onChange={() => {props.onToogleTask(id)}} /> 
                            <span>{title}</span>
                            <button onClick={() => {props.onRemoveTask(id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default TaskList;