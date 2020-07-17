import React from 'react';
import { Layout } from '../Layout';
import './styles.scss';
import { useState } from 'react';
import { Features } from './Features';
import { Subscription } from './Subscription';
import { StatusBar } from './StatusBar';


function Main({ app }) {

    const data = app.data.get;

    const [active, setActive] = useState(data.active);
    const [state, setState] = useState(data.state);
    const [selected_filter, setSelectedFilter] = useState(data.filter);

    const main = {
        data: data,
        state: {
            get: state,
            set: setState
        },
        active: {
            get: active,
            set: setActive
        },
        selected_filter: {
            get: selected_filter,
            set: setSelectedFilter
        }
    };

    return (
        <Layout noback={true}>
            <Subscription state={state} />
            <div className="hp row col flex-column padding1">
                <div className="hp row switch flex v-center margin-bottom1">
                    <StatusBar 
                        state={state} 
                        active={{...main.active}} 
                        count={data.count} 
                        message={app.message} />
                </div>
                <div className="hp row flex flex1 h-center">
                    <Features {...main} />
                </div>
            </div>
        </Layout >
    );
}

export { Main };