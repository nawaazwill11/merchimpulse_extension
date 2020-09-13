import React from 'react'
import PropTypes from 'prop-types'
import './App.scss'
import { Dashboard, Signin, Welcome } from '../containers'

const App = ({
	view,
}) => {
	const views = {
		dashboard: Dashboard,
		signin: Signin,
		welcome: Welcome,
	}
	const Component = views[view]
	return (
		<div className="hp col flex-column">
			<main className="hp rel flex-column flex1">
				<Component />
			</main>
		</div>
	)
}

App.propTypes = {
	view: PropTypes.string,
}

export default App