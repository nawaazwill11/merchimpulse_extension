import React from 'react';
import { Layout } from '../Layout';
import './styles.scss';
import { useState } from 'react';
import { Features } from './Features';
import { Subscription } from './Subscription';
import { StatusBar } from './StatusBar';


function Main({ app }) {

    const app_data = app.data.get;

    const [active, setActive] = useState(app_data.active);
    const [state, setState] = useState(app_data.state);
    const [filter, setFilter] = useState(app_data.filter);

    const main = {
        state: {
            get: state,
            set: setState
        },
        active: {
            get: active,
            set: setActive
        },
        filter: {
            get: filter,
            set: setFilter
        }
    };

    return (
        <Layout noback={true}>
            <Subscription subs={app_data.subs} />
            <div className="hp row flex1 flex-column padding1">
                <div className="hp row switch flex v-center margin-bottom1">
                    <StatusBar
                        subs={app_data.subs}
                        main_active={main.active} 
                        count={app_data.count} 
                        appMessage={app.message} />
                </div>
                <div className="hp row flex flex1 h-center">
                    <Features main={main} app_data={app_data} />
                </div>
            </div>
        </Layout >
    );
}

export { Main };