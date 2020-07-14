import React, { useState, useEffect } from 'react';
import './App.scss';
import { Error, Fresh, Login, Main } from '../components';
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
  const [navigate, setNavigation] = (
    useState({
        history: [],
        current: 0, // index
        goBack: function () {
          if (this.current) {
            const back = this.history[this.current - 1];
            this.current--;
            setNavigation(back);
          }
        }
      })
  );

  useEffect(() => {

    getAppState(props, setState);

  }, [state]);

  const child = function (state) {

    if (state === 'fresh')
      return <Fresh navigate={navigate} setAppState={setState} />

    else if (state === 'login')
      return <Login navigate={navigate} setAppState={setState} />

    else if (state === 'full' || state === 'expired')
      return <Main navigate={navigate} type={state} />

    else return <Error />
  };

  return (
    child(state)
  );
}

export default App;