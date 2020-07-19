import React from 'react';
import './styles.scss';


function OverlayMessage(props) {

    const message = props.message;
    const appState = props.appState;

    const message_def = {
        login: {
            success: 'You are logged in!',
            error: (errors) => {
                return Array.from(Object.keys(errors)).join(<br />)}
        },
        logout: 'You have been logged out',
        expired: 'Your free trial is over,' +
            'Please Buy our subscription to keep using,' +
            'Merch Impulse',
    };

    return (
        <div id="message" className="hp row col abs top0 left0 flex v-center">
            <div className="hp row col30 padding1 flex-column h-center v-center">
                <div className="hp font-size1_5 margin-bottom1 text-center">
                    {message_def[message.get.name]}
                </div>
                <div className="hp">
                    <button className="hp btn btn-primary-inverse" onClick={(e) => handleClose(message, appState)}>Close</button>
                </div>
            </div>
        </div>
    );
}


function handleClose(message, appState) {

    message.set({});
    appState.set(message.get.nextState);

}

export { OverlayMessage as OM }