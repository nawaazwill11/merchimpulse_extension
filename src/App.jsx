import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Loader from './components/Loader'
import { Dashboard, Signin, Welcome, Overlay } from './containers'

const App = ({
	view,
	overlay_active,
	loadData,
}) => {
	// return <></>
	useEffect(() => {
		loadData()
	}, [])

	const views = {
		dashboard: Dashboard,
		loader: Loader,
		signin: Signin,
		welcome: Welcome,
	}
	console.log(view)
	const Component = views[view]
	const overlay = overlay_active ? <Overlay /> : ''
	return (
		<div className="hp col flex-column">
			<main className="hp rel flex-column flex1">
				<Component />
			</main>
			{overlay}
		</div>
	)
}

App.propTypes = {
	view: PropTypes.string,
	overlay_active: PropTypes.bool,
	loadData: PropTypes.func,
}

export default App