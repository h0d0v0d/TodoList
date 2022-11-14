import React from 'react';

import './title.css'

type TitlePropsType = {
    title: string
}

const Title = (props: TitlePropsType) => {
    return (
        <div>
            <h2 className='title'>{props.title}</h2>
        </div>
    );
};

export default Title;