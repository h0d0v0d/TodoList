import React from 'react';

import { MouseEvent } from 'react';

import {TodoListFilterType} from '../App/App'

import './button.css'

type ButtonPropsType = {
    name: TodoListFilterType,
    onChangeFilter: (name: TodoListFilterType) => void
    filter: TodoListFilterType
}


const Button = (props: ButtonPropsType) => {

    const onChangeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onChangeFilter(props.name)
    }

    return (
        <>
            <button className={`filter-button ${props.filter === props.name ? 'active': 'normal'}` }
                    onClick={onChangeFilter}>{props.name}</button>
        </>
    );
};
    
export default Button;