import React from 'react';
import './styles.scss'

function Subscription({ state }) {

    const messages = {
        trial: 'You are using a trial version',
        expired: 'Your trial period has expired'
    }

    return (
        <div id="subscription" className="hp row text-center padding_1">
            {messages[state]}
        </div>
    );
}

export { Subscription };