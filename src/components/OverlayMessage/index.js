import React from 'react';

function OverlayMessage(props) {

    const message = props.message;
    const appState = props.appState;

    const message_def = {
        login: 'You are logged in!',
        logout: 'You have been logged out',
        expired: 'Your free trial is over,' +
            'Please Buy our subscription to keep using,' +
            'Merch Impulse',
    };
    alert()

    return (
        <div id="message" className="hp row col abs top0 left0">

            {message_def[message.get.name]}
            <button onClick={(e) => handleClose(message, appState)}>Close</button>
        </div>
    );
}


function handleClose(message, appState) {

    message.set({});
    appState.set(message.get.nextState);

}

export { OverlayMessage as OM }