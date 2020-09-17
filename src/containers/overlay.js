import { connect } from 'react-redux'
import { setOverlay } from '../actions/overlay'
import { Overlay } from '../components'

const mapStateToProps = (state) => ({
	title: state.overlay.title,
	message: state.overlay.message,
})

const mapDispatchToProps = (dispatch) => ({
	setOverlay: (value) => dispatch(setOverlay(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)