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
            <div className="hp font-size1_6 bold">
              Merch Impulse
              </div>
            <div className="hp btn-padding5">
              <button className="hp border-radius1_1">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export { Fresh }