import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({
	title,
	message,
	setOverlay
}) => {
	const message_elem = (message) => (
		<li key={message} className="hp padding-bottom_5">
			{message}
		</li>
	)
	return (
		<div id="message" className="hp row col abs top0 left0 flex v-center">
			<div className="hp row col70 padding1 flex-column h-center v-center">
				<div className="hp row font-size1 margin-bottom1 flex h-center">
					<div className="hp row col-na-10">
						<div className="hp padding1 text-center font-size1_5 bold border-radius_2">
							{title}
						</div>
						<div className="hp row" >
							<p className="hp bold">Issues:</p>
							<ul className="hp row padding0 padding-left1">
								{message.map((message) => message_elem(message))}
							</ul>
						</div >
					</div>
				</div>
				<div className="hp row flex h-center margin-top1">
					<button className="hp col-na-6 btn btn-primary-inverse "
						onClick={() => setOverlay({active: false})}>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}

Overlay.propTypes = {
	title: PropTypes.string,
	message: PropTypes.array,
	setOverlay: PropTypes.func,
}

export default Overlay