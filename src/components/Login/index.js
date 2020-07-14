import React, { useState } from 'react'
import { Layout } from '../Layout';


function Login(props) {

    const setAppState = props.setAppState;

    return (
        <Layout navigate={props.navigate}>
            <div className="hp row col">
                <div className="hp col-na-12 col">
                    <div className="hp col flex-column">
                        {/* <div className="hp flex8">
                            <a className="hp font-size1">Create New Account</a>
                        </div> */}
                        <div className="hp flex-column flex20 v-center h-center">
                            <div className="hp padding1">
                                <input className="hp inp" type="email" name="email" placeholder="Email" />
                            </div>
                            <div className="hp padding1">
                                <input className="hp inp" type="password" name="password" placeholder="Password" />
                            </div>
                            <div className="hp row flex right padding1">
                                <a className="hp font-size_8"
                                    href="#! link">Forgot password?</a>
                            </div>
                            <div className="hp padding1">
                                <button id="login" className="hp btn btn-primary">Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export { Login }