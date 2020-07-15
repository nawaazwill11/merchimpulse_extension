import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import channel from './util/channel';

async function getStorageItems() {

    return new Promise(async (resolve, reject) => {

        try {
            const message = {
                type: 'STORAGE_GET',
                key: null
            };

            const response = await channel.sendMessage(message);

            console.log(response);

            if (!Object.keys(response).length) {
                return resolve({
                    error: true
                });
            }

            return resolve({
                items: response
            });
        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });

}

(async function () {

    let props = {};

    try {

        const { error, items } = await getStorageItems();

        if (error)
            props.error = true;

        else
            props.items = items;
    }
    catch (error) {
        console.log(error);
        props.error = true;
    }
    finally {

        ReactDOM.render(
            <React.StrictMode>
                <App {...props} />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
})();

// ReactDOM.render(
//   <React.StrictMode>
//     <App  />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
