import React, { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import Button from '../Button/Button'
import Title from '../Title/Title';
import { TodoListTaskType, TodoListFilterType } from '../App/App';

import './todoList.css'
import { v1 } from 'uuid';

type TodoListPropsType = {
    todiListId: string,
    title: string,
    tasks: Array<TodoListTaskType>,
    filter: TodoListFilterType,
    students: Array<string>
    addNewTask: (text: string, todiListId: string) => void, 
    removeTask: (id: string, todiListId: string) => void,
    changeFilter: (newFilter: TodoListFilterType, todiListId: string) => void,
    toogleTask: (id: string, todiListId: string, newStatus: boolean) => void,
    removeTaskList: (id: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const onAddNewTask = () => {
        if (value.trim() !== '') {
            props.addNewTask(value.trim(), props.todiListId)
            setError(false)
            return setValue('')
        }
        setError(true)
    }

    const onRemoveTask = (id: string) => {
        props.removeTask(id, props.todiListId)
    }

    const onToogleTask = (id: string, newStatus: boolean) => {
        props.toogleTask(id, props.todiListId, newStatus)
    }

    const onChangeFilter = (newFilter: TodoListFilterType) => {
        props.changeFilter(newFilter, props.todiListId)
    }
 
    const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' ? onAddNewTask() : e.key !== ' ' ? setError(false) : null
    }

    const changeShow = () => {
        return setShow(show => !show)
    }

    const buttonData: Array<TodoListFilterType> = ['All', 'Active', 'Completed']

    return (
        <div className='todo-list'>
            <Title title={props.title}/>
            {   
                show && 
                <>
                    <div>
                        <input onChange={(e) => {setValue(e.currentTarget.value)}} 
                               value={value}
                               onKeyDown={onClickEnter}
                               className={`input ${error ? 'error-input' : 'normal-input'}`}/>
                        <button onClick={onAddNewTask} className='add-task-button' >Добавить task</button>
                        {
                            error && <div className='error-message'>Валидация не пройдена идиот</div>
                        }
                    </div> 
                        {
                            props.tasks.length === 0 ? 
                            <span>Список задач пуст...</span> :
                            <TaskList tasks={props.tasks} 
                                      onRemoveTask={onRemoveTask} 
                                      onToogleTask={onToogleTask}/>
                        }
                    <div className='filter-button-wrapp'>
                        {
                            buttonData.map((item: TodoListFilterType) => {
                                return (
                                    <Button key={v1()} 
                                            name={item} 
                                            onChangeFilter={onChangeFilter}
                                            filter={props.filter}/>
                                )
                            })
                        }     
                    </div>
                    {
                        props.students.map((s, i) => {
                            return <div key={i}>{s}</div>
                        })
                    }
                </>
            }
            <div className='main-buttons-wrapper'>
                <button onClick={changeShow} className='show-button'>{show ? 'Hide' : 'Show'}</button>
                <button onClick={() => {props.removeTaskList(props.todiListId)}} className='remove-list-button'>Delete list</button>
            </div>
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















