import React from 'react';

import validator from 'email-validator';

export const extension_id = 'alfiagindfcaggjeofolfdifnlciilgm';

// export const extension_id = 'gcfhlcjmpnknffcpblnadkljicabdnfn';

export const api_server = "http:localhost:8000";

export const validations = {
    credentials: function ({ email, password }) {

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
            console.log('errors', errors)
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
    },
    logout: function () {
        return {
            header: 'Logged out',
            bg: "#F57200",
            nextState: 'base'
        }
    }

};

export const api_routes = {
    login: api_server + '/api/login',
}

export const api = {
    login: function (credentials) {
        return fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(credentials)
        });
    }
}