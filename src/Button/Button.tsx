import React from 'react';

import {TodoListFilterType} from '../App/App'

import './button.css'

type ButtonPropsType = {
    name: TodoListFilterType,
    changeFilter: (name: TodoListFilterType) => void
}


const Button = (props: ButtonPropsType) => {
    return (
        <>
            <button className='filter-button' 
                    onClick={() => {props.changeFilter(props.name)}} >{props.name}</button>
        </>
    );
};
    
export default Button;