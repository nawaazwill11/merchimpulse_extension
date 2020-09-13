import { connect } from 'react-redux'
import { loadData } from '../actions/app'
import App from '../App'

const mapStateToProps = (state) => {
	console.log(state)
	return ({
		view: state.app.view,
	})
}
const mapDispatchToProps = (dispatch) => ({
	loadData: () => dispatch(loadData())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)