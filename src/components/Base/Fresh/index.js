import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Fresh = ({ setPage }) => {

	return (
		<div className="hp row col flex h-center v-center padding1">
			<div className="hp row col40">
				<div className="hp col-na-12 col">
					<div className="hp col flex-column h-center welcome-text">
						<div className="hp text-center">
							<div className="hp font-size1_6 margin-bottom_5">Welcome To</div>
							<div className="hp bold font-size2">Merch Impulse</div>
						</div>
						<div>
							<button className="hp btn btn-primary login-btn font-size1_3"
								onClick={() => setPage('login')}>
								Sign In
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}

Fresh.propTypes = {
	setPage: PropTypes.func,
}

export default Fresh