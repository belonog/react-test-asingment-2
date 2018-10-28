import './Loading.css';
import React from 'react';

const Loading = ({ dark, relative }) => {
    return (
        <div className={'loading' + (dark ? ' m-dark' : '') + (relative ? ' m-relative' : '')}>
            <div className="signal"></div>
        </div>
    );
};

export default Loading;
