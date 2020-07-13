import React, { useState, useEffect } from 'react';
import './App.scss';
import { Error, Fresh, Main } from '../components';
import { getAppState } from './sidekick';

function App(props) {
  /* 
    App has 3 main states:
      1. Fresh / logout
        1.1. Welcome screen
        1.2. Log in screen
      2. Fully usable / logged in
        2.1. All components active:
          -> App state toggle
          -> Filters
          -> View Bookmarks
      3. Partially usable / expired / logged in
        3.1. Only View Bookmarks active
  */

  const [state, setState] = useState('fresh');
  const [items, setItems] = useState({});

  useEffect(() => {

    getAppState(props, setState);

  }, [state]);

  const child = function (state) {

    if (state === 'fresh')
      return <Fresh />

    else if (state === 'full' || state === 'expired')
      return <Main type={state} />

    else return <Error />
  };

  return (
      child(state)
  );
}

export default App;