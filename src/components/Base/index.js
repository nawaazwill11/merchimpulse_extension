import React, { useState } from 'react';
import { Login } from './Login';
import { Fresh } from './Fresh';


function Base(props) {

    const [state, setState] = useState('fresh');

    const [navigate, setNavigation] = useState({
        history: [],
        towards: function (to, from) {
            this.history.push(from);
            setState(to);
            console.log(this.history);
        },
        back: function () {
            let pos = this.history.length;
            if (!pos) return;
            --pos;
            console.log(this.history[pos]);
            const [back] = this.history.splice(--pos, 1);
            setState(back);
        }
    });

    if (state === 'fresh')
        return <Fresh navigate={navigate} />
    
    if (state === 'login')
        return <Login navigate={navigate} app={props.app} />

    
}

export { Base };