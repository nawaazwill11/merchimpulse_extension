import React from 'react';

import validator from 'email-validator';

export const extension_id = 'alfiagindfcaggjeofolfdifnlciilgm';

export const validations = {
    credentials: function (email, password) {

        const errors = [];

        if (!validator.validate(email))
            errors.push('Email malformed');

        if (!password.match(/^.{8,25}$/))
            errors.push('Password should be minimum 8 characters');

        return errors.length ? errors : null;
    }
}
export const message_def = {
    authentication: {
        success: function () {
            return {
                header: 'Login Success',
                bg: '#F57200',
                nextState: 'main'
            };
        },
        error: function (errors) {
            return {
                header: 'Login Failed',
                bg: 'red',
                body: (
                    <div className="hp row">
                        <p className="hp bold">Issues:</p>
                        <ul className="hp row padding0 padding-left1">
                            {errors.map((error) => (
                                <li className="hp padding-bottom_5">
                                    {`${error}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        }
    },
    state: {
        expired: 'Your free trial is over,' +
            'Please Buy our subscription to keep using,' +
            'Merch Impulse',
    }
    
};