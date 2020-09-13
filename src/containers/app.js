import { connect } from 'react-redux'
import App from '../App'

const mapStateToProps = (state) => {
	console.log(state)
	return ({
		view: state.app.view,
	})
}

export default connect(mapStateToProps)(App)