import React from 'react';
import './styles.scss';
import { OM } from '../../OverlayMessage';

function handleClick(message) {

    message.set({
        name: 'logout',
        nextState: 'base'
    });
}

function Logout({ message }) {

    return (
        <div id="logout" className="" onClick={() => handleClick(message)} >
            <img className="small-icon" src="/logout.svg" alt="logout" />
        </div>
    );
}

export { Logout };