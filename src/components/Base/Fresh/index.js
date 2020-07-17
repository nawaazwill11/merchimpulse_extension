import React from 'react';
import './styles.scss';
import { Layout } from '../../Layout';


function Fresh(props) {
  const navigate = props.navigate;

  return (
    <Layout navigate={props.navigate} noheader={true}>
      <div className="hp row col flex h-center v-center padding1">
        <div className="hp row col40">
          <div className="hp col-na-12 col">
            <div className="hp col flex-column h-center welcome-text">
              <div className="hp text-center">
                <div className="hp font-size1_6 margin-bottom_5">Welcome To</div>
                {/* </div>
              <div className="hp font-size2 bold"> */}
                <div className="hp bold font-size2">Merch Impulse</div>
              </div>
              <div>
                <button className="hp btn btn-primary login-btn font-size1_3"
                  onClick={(e) => handleClick(navigate)}>
                  Sign In
              </button>
              </div>
              {/* <div className="hp border"></div>
            <div>
              <button className="hp btn btn-primary login-btn font-size1_3" 
                onClick={(e) => handleClick(setAppState)}>
                Sign Up
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

}

function handleClick(navigate) {


  navigate.towards('login', 'fresh');

  console.log(navigate);
}

export { Fresh }