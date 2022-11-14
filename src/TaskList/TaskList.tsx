import React from 'react';

import {TodoListTaskType} from '../App/App'

type TaskListPropsType = {
    tasks: Array<TodoListTaskType>,
    onDeletetask_1: Function,
    toogleTask: Function
}

const TaskList = (props: TaskListPropsType) => {
    return (
        <ul>
            {
                props.tasks.map((item: TodoListTaskType) => {
                    return (
                        <li key={item.id}>
                            <input type="checkbox" 
                                   checked={item.isDone} 
                                   onChange={() => {props.toogleTask(item.id)}} /> 
                            <span>{item.title}</span>
                            <button onClick={() => {props.onDeletetask_1(item.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default TaskList;