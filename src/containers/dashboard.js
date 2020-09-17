import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { setActive, setActiveFilter } from '../actions/dashboard'
import { logout } from '../actions/app'

const mapStateToProps = (state) => ({
	state: state.dashboard.state,
	active: state.dashboard.active,
	active_filter: state.dashboard.active_filter,
	search_count: state.dashboard.search_count,
})

const mapDispatchToProps = (dispatch) => ({
	setActive: (active) => dispatch(setActive(active)),
	setActiveFilter: (active_filter) => dispatch(setActiveFilter(active_filter)),
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)