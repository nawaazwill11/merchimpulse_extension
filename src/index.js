import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import channel from './util/channel';
import { validateData } from './util/storage';
import { data } from './mock';

async function getStorageItems() {

    return new Promise(async (resolve, reject) => {

        try {
            const message = {
                type: 'STORAGE_GET',
                key: null
            };

            const response = await channel.sendMessage(message);
            
            // IMPORTANT
            // check for data keys validity.
            // if not all are found, set default values.com

            const [error, app_data] = await validateData(response);
            
            if (error) throw new Error(error);

            return resolve({ data: app_data });
        }
        catch (error) {
            console.error(error);
            return reject(error);
        }
    });

}

(async function () {

    let props = {};

    try {

        const { error, data } = await getStorageItems();

        if (error)
            props.error = true;

        else
            props.app_data = data;
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
//     <App app_data={data} />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
