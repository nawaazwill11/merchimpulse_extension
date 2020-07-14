import React from 'react';
import './styles.scss';


function Fresh(props) {

  const setAppState = props.setAppState;

  return (
    <div className="hp row col flex h-center v-center padding1">
      <div className="hp row col70">
        <div className="hp col-na-12 col">
          <div className="hp col flex-column h-center welcome-text">
            <div className="hp font-size1_3 top">
              Welcome To
            </div>
            <div className="hp font-size2 bold">
              Merch Impulse
            </div>
            <div>
              <button className="hp btn btn-primary login-btn font-size1_3" 
                onClick={(e) => handleClick(setAppState)}>
                Sign In
              </button>
            </div>
            <div className="hp font-size1_2 bold">Or</div>
            <div>
              
              <button className="hp btn btn-primary login-btn font-size1_3" 
                onClick={(e) => handleClick(setAppState)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

function handleClick(setAppState) {

  setAppState('login');

}

export { Fresh }