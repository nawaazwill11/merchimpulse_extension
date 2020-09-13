import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.scss'
import Loader from '../components/Loader'
import { Dashboard, Signin, Welcome } from '../containers'

const App = ({
	view,
	loadData,
}) => {
	useEffect(() => {
		loadData()
	})

	const views = {
		dashboard: Dashboard,
		signin: Signin,
		welcome: Welcome,
	}
	const Component = views[view] || Loader
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
	loadData: PropTypes.func,
}

export default App