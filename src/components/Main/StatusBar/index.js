import React from 'react';
import { useState } from 'react';
import { Logout } from '../Logout';


function handleSwitchClick(active) {

    active.set(!active.get);

}

function StatusBar({ state, active, count }) {

    // const [checked, setChecked] = useState(active.get);

    // const status_bar = {
    //     checked: {
    //         get: checked,
    //         set: setChecked
    //     }
    // };

    const toggle = function () {
        return (
            <div className="">
                <div className="checkbox-container yellow">
                    <input type="checkbox" id="toggle" className="toggle" data-type="state" checked={active.get} />
                    <label htmlFor="toggle" onClick={(e) => {handleSwitchClick(active)}}></label>
                    <div className="active-circle"></div>
                </div>
            </div>
        );
    }();

    const counts = function () {
        if (state !== 'full') {
            return (
                <div className="hp flex1 text-center font-size1_2">
                    Searches Left: {count}
                </div>
            );
        }
        return '';
    }();

    const logout = <Logout />;

    return (
        <React.Fragment>
            {toggle}
            {counts}
            {logout}
        </React.Fragment>
    );
}

export { StatusBar }