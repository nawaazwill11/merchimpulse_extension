import React from 'react';

/**
 * @param  {Boolean} {selected}
 * @returns  {ReactDOM} 
 */

function Filter({ name, selected, main_filter }) {

    return (
        <div className={"hp row col-na-12 border_1 padding_5 text-center filter " + (selected ? 'selected' : '')}
            onClick={(e) => handleClick(name, main_filter)}>
            {name}
        </div>
    );
}


/**
 * Adds a className:select to the current element
 *  
 * @param  {Object} main
 */


function handleClick(name, main_filter) {
    
    // add to filter name to local storage //

    main_filter.set(name);

}

export { Filter };