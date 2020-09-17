import {
	SET_OVERLAY
} from '../actions/overlay'

const initial_state = {
	active: false,
	title: '',
	message: [],
}

const overlayReducer = (state = initial_state, action) => {
	switch (action.type) {
		case SET_OVERLAY: 
			return {
				...state,
				...action.payload,
			}
		default: return state
	}
}

export default overlayReducer