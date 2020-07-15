import React from 'react'
import { Layout } from '../../Layout';
import { handleLogin } from './sidekick';

function Login(props) {

    return (
        <Layout navigate={props.navigate}>
            <div className="hp row col90 margin-top1_7">
                <div className="hp col-na-12 col">
                    <div className="hp col flex-column ">
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
                                <button id="login" className="hp btn btn-primary" 
                                    onClick={(e) => handleLogin(props.app)} >Sign In</button>
                            </div>
                        </div>
                         <div className="hp flex8 flex h-center v-center">
                            <a href="#!" className="hp font-size1 border_1 padding1 bold">
                                Create A New Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}


export { Login }