import React from 'react';
import './styles.scss';


function getAge(time) {

    const now = new Date().getTime();
    const difference = now - time;
    const ago = parseInt(difference / 86400000, 10);
    
    if (ago < 1) {
        return (function () {
            const that_time = new Date(time);
            return that_time.getHours() + ':' + that_time.getMinutes();
        })();
    }

    return (`${ago} day${ago === 1 ? '' : 's'} ago`);
}

function Bookmark({ bookmark }) {

    return (
        <div className="hp row font-size_8 padding-top_4 padding-bottom_4 flex v-center">
            <div className="hp flex1 ellipsis" title={bookmark.name}>{bookmark.name}</div>
            <div className="hp flex2 text-center">{getAge(bookmark.age)}</div>
            <div className="hp flex1 text-center">
                <a href="#!">
                    <img className="small-icon" src="/out.svg" alt="out" />
                </a>
            </div>
        </div>
    );
}

export { Bookmark }