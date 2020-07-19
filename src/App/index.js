import React, { useState } from 'react';
import './App.scss';
import { Error, Base, Main, OM } from '../components';

function App({error, app_data}) {
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

  const [state, setState] = useState(error || app_data.state);
  const [message, setMessage] = useState({});
  const [data, setData] = useState(app_data);

  const app = {
    state: {
      get: state,
      set: setState
    },
    message: {
      get: message,
      set: setMessage
    },
    data: {
      get: data,
      set: setData
    }
  };


  const child = function (state) {

    if (state === 'base')
      return <Base app={app}/>

    // else if (state === 'login')
    //   return <Login navigate={navigate} />

    else if (state === 'main')
      return <Main app={app} />

    else return <Error error={error} />
  };

  
  const overlay = function () {
    if (message.header || message.body)
      return <OM app_state={{...app.state}} app_message={{...app.message}} />
  }();

  console.log(overlay);

  return (
    <React.Fragment>
      {overlay}
      {child(state)}
    </React.Fragment>
  );
}

export default App;