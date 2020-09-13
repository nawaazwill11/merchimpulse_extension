import {
	SET_STATE,
	SET_ACTIVE,
	SET_ACTIVE_FILTER
} from '../actions/dashboard'

const initial_state = {
	state: 'trial',
	active: true,
	active_filter: '',
}

const dashboardReducer = (state = initial_state, action) => {
	switch (action.type) {
		case SET_STATE:
			return {
				...state,
				state: action.payload,
			}
		case SET_ACTIVE:
			return {
				...state,
				active: action.payload,
			}
		case SET_ACTIVE_FILTER:
			return {
				...state,
				active_filter: action.payload,
			}
		default: return state
	}
}

export default dashboardReducer