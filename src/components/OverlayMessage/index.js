import React from 'react';
import './styles.scss';

function OverlayMessage({ appMessage, appState }) {

    return (
        <div id="message" className="hp row col abs top0 left0 flex v-center">
            <div className="hp row col70 padding1 flex-column h-center v-center">
                <div className="hp row font-size1 margin-bottom1 flex h-center">
                    <div className="hp row col-na-10">
                        <div className="hp padding1 text-center font-size1_5 bold border-radius_2"
                            style={{ backgroundColor: appMessage.get.bg }}>
                            {appMessage.get.header}
                        </div>
                        {appMessage.get.body}
                    </div>
                </div>
                <div className="hp row flex h-center margin-top1">
                    <button className="hp col-na-6 btn btn-primary-inverse "
                        onClick={(e) => handleClose(appMessage, appState)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function handleClose(appMessage, appState) {

    const nextState = appMessage.get.nextState;

    if (nextState) {
        appState.set(nextState);
    }
    appMessage.set(false);

}

export { OverlayMessage as OM }