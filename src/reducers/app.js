import {
	SET_VIEW,
	SET_DATA,
} from '../actions/app'

const initial_state = {
	view: 'dashboard',
	data: {},
}

const appReducer = (state = initial_state, action) => {
	switch (action.type) {
		case SET_VIEW:
			return {
				...state,
				view: action.payload,
			}
		case SET_DATA:
			return {
				...state,
				data: action.payload
			}
		default: return state
	}
}

export default appReducer