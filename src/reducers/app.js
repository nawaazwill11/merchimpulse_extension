import {
	SET_VIEW,
	SET_LOADER,
	SET_AUTH,
} from '../actions/app'

const initial_state = {
	auth: false,
	loader: true,
	view: '',
}

const appReducer = (state = initial_state, action) => {
	console.log(action)
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				auth: action.payload,
			}
		case SET_VIEW:
			return {
				...state,
				view: action.payload,
			}
		case SET_LOADER:
			return {
				...state,
				loader: action.payload,
			}
		default: return state
	}
}

export default appReducer