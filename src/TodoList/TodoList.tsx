import React, { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import Button from '../Button/Button'
import Title from '../Title/Title';
import { TodoListTaskType, TodoListFilterType } from '../App/App';

import './todoList.css'
import { v1 } from 'uuid';

type TodoListPropsType = {
    tasks: Array<TodoListTaskType>,
    onRemoveTask: (id: string) => void,
    onAddNewTask: (text: string) => void, 
    onChangeFilter: (newFilter: TodoListFilterType) => void,
    filter: TodoListFilterType,
    onToogleTask: (id: string) => void,
    title: string
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const addNewTask = () => {
        if (value.trim() !== '') {
            props.onAddNewTask(value.trim())
            setError(false)
            return setValue('')
        }
        setError(true)
    }

    const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        return e.key === 'Enter' ? addNewTask() : null;
    }

    const changeShow = () => {
        return setShow(show => !show)
    }

    const buttonData: Array<TodoListFilterType> = ['All', 'Active', 'Completed']

    return (
        <div>
            <Title title={props.title}/>
            {   
                show && 
                <>
                    <div>
                        <input onChange={(e) => {setValue(e.currentTarget.value)}} 
                               value={value}
                               onKeyDown={onClickEnter}
                               className={error ? 'error-input' : ''}/>
                        <button onClick={addNewTask}>Добавить task</button>
                        {
                            error && <div className='error-message'>Ошибка блять</div>
                        }
                    </div> 
                    <TaskList tasks={props.tasks} 
                              onRemoveTask={props.onRemoveTask} 
                              onToogleTask={props.onToogleTask}/>
                    <div>
                        {
                            buttonData.map((item: TodoListFilterType) => {
                                return (
                                    <Button key={v1()} 
                                            name={item} 
                                            onChangeFilter={props.onChangeFilter}
                                            filter={props.filter}/>
                                )
                            })
                        }     
                    </div>
                </>
            }
            <button onClick={changeShow} className='show-button'>{show ? 'Hide' : 'Show'}</button>
        </div>
    );
};

export default TodoList;



































































































{/* <button onClick={() => {onChangeFilter('All')}} 
                                className={classForButton('All')}>All</button>
                        <button onClick={() => {onChangeFilter('Active')}} 
                                className={classForButton('Active')}>Active</button>
                        <button onClick={() => {onChangeFilter('Completed')}} 
                                className={classForButton('Completed')}>Completed</button> */}















