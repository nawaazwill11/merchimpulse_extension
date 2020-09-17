import { combineReducers } from 'redux'

import appReducer from './app'
import dashboardReducer from './dashboard'
import overlayReducer from './overlay'

export default combineReducers({
	app: appReducer,
	dashboard: dashboardReducer,
	overlay: overlayReducer,
})