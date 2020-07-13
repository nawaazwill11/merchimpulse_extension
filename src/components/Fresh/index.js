import React from 'react';
import { Layout } from '../Layout';
import './styles.scss';


function Fresh(props) {

  return (
    <div className="hp col flex h-center v-center">
      <div className="hp row">
        <div className="col-na-12">
          <div className="hp flex-column v-center welcome-text">
            <div className="hp font-size1_3">
              Welcome To
                </div>
            <div className="hp font-size2 bold">
              Merch Impulse
              </div>
            <div>
              <button className="hp btn border-radius1_1 
              padding_5 login-btn font-size1_3">
                Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export { Fresh }