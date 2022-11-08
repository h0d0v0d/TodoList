import React from 'react';

import { TodoListTaskType } from './App';

type TodoListPropsType = {
    title: string,
    tasks: Array<TodoListTaskType>,
    onDeletetask_1: Function
}

const TodoList = (props: TodoListPropsType) => {

    const toogle = () => {
        console.log('Toogle')
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map((item: TodoListTaskType) => {
                            return (
                                <li key={item.id}><input type="checkbox" 
                                                   checked={item.isDone} 
                                                   onChange={toogle} /> <span>{item.title}</span>
                                <button onClick={() => {props.onDeletetask_1(item.id)}}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;












