import React from 'react';

function Error({ error }) {

    const body = document.querySelector('body');
    body.style.backgroundColor = "red";

    return (
        <div className="div hp row col">
            <div className="hp font-size1_5 padding1 margin-top2">
                <div className="hp bold margin-bottom1">
                    Could Not Load App</div>
                {error}
            </div>
        </div>
    );

}

export { Error }