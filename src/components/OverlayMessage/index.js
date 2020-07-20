import React from 'react';
import './styles.scss';

const errorBody = function (errors) {

    const error_elem = function (error) {
        return (
            <li key={error} className="hp padding-bottom_5">
                {error}
            </li>
        );
    }

    if (typeof (errors) === 'string')
        return error_elem(errors);

    else if (typeof (errors) === 'object')
        return  errors.map((error) => error_elem(error))
    
}

function handleClose(app_message, app_state) {

    const nextState = app_message.get.nextState;

    if (nextState) {
        app_state.set(nextState);
    }
    app_message.set(false);

}


function OverlayMessage({ app_message, app_state }) {

    const header = function (header) {
        if (header)
            return (
                <div className="hp padding1 text-center font-size1_5 bold border-radius_2"
                    style={{ backgroundColor: app_message.get.bg }}>
                    {app_message.get.header}
                </div>
            );
    }(app_message.get.header)

    const body = function (message) {

        console.log(message);

        if (message.errors) {
            return (
                < div className="hp row" >
                    <p className="hp bold">Issues:</p>
                    <ul className="hp row padding0 padding-left1">
                        {errorBody(message.errors)}
                    </ul>
                </div >
            );
        }

        return message.body;

    }(app_message.get)

    return (
        <div id="message" className="hp row col abs top0 left0 flex v-center">
            <div className="hp row col70 padding1 flex-column h-center v-center">
                <div className="hp row font-size1 margin-bottom1 flex h-center">
                    <div className="hp row col-na-10">
                        {header}
                        {body}
                    </div>
                </div>
                <div className="hp row flex h-center margin-top1">
                    <button className="hp col-na-6 btn btn-primary-inverse "
                        onClick={(e) => handleClose(app_message, app_state)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export { OverlayMessage as OM }