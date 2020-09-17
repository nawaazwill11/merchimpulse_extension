import {
	SET_VIEW,
	SET_DATA,
	SET_AUTH,
	SET_APP,
} from '../actions/app'

const initial_state = {
	auth: false,
	view: 'loader',
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
		case SET_DATA:
			return {
				...state,
				...action.payload,
			}
		case SET_APP: 
			return action.payload
		default: return state
	}
}

export default appReducer