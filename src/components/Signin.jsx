import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { SIGNUP_WEB_ROUTE } from '../config/definitions'
const Signin = ({
	signIn
}) => {

	const handleSignIn = () => {
		const email = document.getElementById('email').value.match(/\S+/)[0]
		const password = document.getElementById('password').value.match(/\S+/)[0]
		signIn(email, password)
	}

	return (
		<>
			<Header />
			<div className="hp row col94 margin-top1_7">
				<div className="hp col-na-12 col">
					<div className="hp col flex-column ">
						{/* <div className="hp flex8">
                            <a className="hp font-size1">Create New Account</a>
                        </div> */}
						<div className="hp flex-column flex20 v-center h-center padding1">
							<div className="hp row flex h-center margin1">
								<input className="hp inp" type="email" id="email" placeholder="Email" />
							</div>
							<div className="hp row flex h-center margin1">
								<input className="hp inp" type="password" id="password" placeholder="Password" />
							</div>
							<div className="hp row">
								<a className="hp font-size_8"
									href="#! link">Forgot password?</a>
							</div>
							<div className="hp padding1">
								<button id="login" className="hp btn btn-primary"
									onClick={() => handleSignIn()} >Sign In</button>
							</div>
						</div>
						<div className="hp divider margin-left1 margin-right1"></div>
						<div className="hp flex8 flex h-center v-center padding1">
							<a
								href={SIGNUP_WEB_ROUTE}
								className="hp font-size1 padding1 bold primary-contrast"
								target="_blank"
								rel="noopener noreferrer"
							>
								Create A New Account
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

Signin.propTypes = {
	signIn: PropTypes.func,
}

export default Signin