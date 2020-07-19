import React from 'react';
import './styles.scss';
import { message_def } from '../../../config/definitions';

function handleClick(app_message) {

    app_message.set(message_def.logout());
}

function Logout({ app_message }) {

    return (
        <div id="logout" className="" onClick={() => handleClick(app_message)} >
            <img className="small-icon" src="/logout.svg" alt="logout" />
        </div>
    );
}

export { Logout };