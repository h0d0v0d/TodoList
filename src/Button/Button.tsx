import React from 'react';

import {TodoListFilterType} from '../App/App'

import './button.css'

type ButtonPropsType = {
    name: TodoListFilterType,
    filter: TodoListFilterType
    onChangeFilter: (name: TodoListFilterType) => void
}


const Button = (props: ButtonPropsType) => {

    const onChangeFilter = () => {
        props.onChangeFilter(props.name)
    }

    return (
        <>
            <button className={`filter-button ${props.filter === props.name ? 'active': 'normal'}` }
                    onClick={onChangeFilter}
            >{props.name}</button>
        </>
    );
};
    
export default Button;