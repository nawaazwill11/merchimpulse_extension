import React from 'react';
import './styles.scss';
import { OM } from '../../OverlayMessage';

function handleClick(appMessage) {

    appMessage.set({
        name: 'logout',
        nextState: 'base'
    });
}

function Logout({ appMessage }) {

    return (
        <div id="logout" className="" onClick={() => handleClick(appMessage)} >
            <img className="small-icon" src="/logout.svg" alt="logout" />
        </div>
    );
}

export { Logout };