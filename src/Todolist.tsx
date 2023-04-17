import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';
import { Task } from './Task'
import { FilterValuesType } from './state/todolists-reducer';
import { TaskType, createTaskTC, setTasksTC } from './state/tasks-reducer';
import { useAppDispatch } from './state/store';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(title, props.id))
    }, [dispatch])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const changeFilter = () => {
        console.log('Фильтр измениться, когда нибуль это сработает')
    }

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)
            }
        </div> 
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeFilter}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeFilter}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeFilter}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


