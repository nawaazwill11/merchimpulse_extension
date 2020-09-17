import { createAction } from 'redux-actions'
import { activeKey, filterKey, localStore } from '../config/definitions'

export const SET_STATE = 'SET_STATE'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'
export const SET_SEARCH_COUNT = 'SET_SEARCH_COUNT'

export const setState = createAction(SET_STATE)
export const setSearchCount = createAction(SET_SEARCH_COUNT)
export const setActive = (activity) => (dispatch) => {
	localStore.set(activeKey, activity)
	dispatch(createAction(SET_ACTIVE)(activity))
}
export const setActiveFilter = (filter) => (dispatch) => {
	localStore.set(filterKey, filter)
	dispatch(createAction(SET_ACTIVE_FILTER)(filter))
}