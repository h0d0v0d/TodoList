import React from 'react';

import './button.css'

type ButtonPropsType = {
    name: string,
    changeFilter: (name: string) => void
}


const Button = (props: ButtonPropsType) => {
    return (
        <>
            <button className='filter-button' onClick={() => {props.changeFilter(props.name)}} >{props.name}</button>
        </>
    );
};

export default Button;