import React, { useState } from 'react';
import './styles.scss';
import { Logout } from '../Logout';


function handleSwitchClick(checked) {

    return checked.set(!checked.get);
}

function StatusBar({ state, active, count }) {

    const [checked, setChecked] = useState(active.get);

    const status_bar = {
        checked: {
            get: checked,
            set: (isChecked) => {
                setChecked(isChecked);
                active.set(isChecked);
            }
        }
    };

    const toggle = function () {

        const active_class = checked ? 'active' : '';

        return (
            <div className="">
                <div className="checkbox-container yellow">
                    <input type="checkbox" id="toggle" className="toggle" checked={checked} />
                    <label htmlFor="toggle" className={active_class} 
                        onClick={(e) => {handleSwitchClick(status_bar.checked)}}></label>
                    <div className="active-circle"></div>
                </div>
            </div>
        );
    }();

    const counts = function () {

        if (state !== 'full') {
            
        }
        return (
            <div className="hp flex1 text-center font-size1_2">
                {
                    state === 'full' ? '' :
                        `Searches left: ${count}`
                }      
            </div>
        );
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