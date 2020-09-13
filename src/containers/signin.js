import { connect } from 'react-redux'
import { setView } from '../actions/app'
import Signin from '../components/Signin'

const mapStateToProps = (state) => ({
	// view: state.app.view,
	// data: state.app.data,
})

const mapDispatchToProps = (dispatch) => ({
	setView: (view) => dispatch(setView(view))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)