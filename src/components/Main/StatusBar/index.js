import React, { useState } from 'react';
import './styles.scss';
import { Logout } from '../Logout';


function handleSwitchClick(subs, checked) {

    if (subs === 'expired') return '';

    return checked.set(!checked.get);
}

function StatusBar({ subs, main_active, count, app_message }) {

    console.log(main_active.get);

    const [checked, setChecked] = useState(main_active.get);

    const status_bar = {
        checked: {
            get: checked,
            set: (isChecked) => {
                setChecked(isChecked);
                main_active.set(isChecked);
            }
        }
    };

    const toggle = function () {

        const active_class = checked ? 'active' : '';

        return (
            <div className="">
                <div className="checkbox-container yellow">
                    <input type="checkbox" id="toggle" className="toggle" defaultChecked={checked} />
                    <label htmlFor="toggle" className={active_class} 
                        onClick={(e) => {handleSwitchClick(subs, status_bar.checked)}}></label>
                    <div className="active-circle"></div>
                </div>
            </div>
        );
    }();

    const counts = function () {

        return (
            <div className="hp flex1 text-center font-size1_2">
                {
                    main_active.get 
                        ?   subs === 'full' 
                            ? ''
                            : `Searches left: ${10 - count}`
                        : ''
                }      
            </div>
        );
    }();

    const logout = <Logout app_message={app_message} />;

    return (
        <React.Fragment>
            {toggle}
            {counts}
            {logout}
        </React.Fragment>
    );
}

export { StatusBar }