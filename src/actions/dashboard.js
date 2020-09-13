import { createAction } from 'redux-actions'
import { setStorageData } from '../config/definitions'

export const SET_STATE = 'SET_STATE'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'
export const SET_SEARCH_COUNT = 'SET_SEARCH_COUNT'

export const setState = createAction(SET_STATE)
export const setActive = createAction(SET_ACTIVE)
export const setSearchCount = createAction(SET_SEARCH_COUNT)
export const setActiveFilter = (filter) => (dispatch) => {
	setStorageData('filter', filter)
	dispatch(createAction(SET_ACTIVE_FILTER)(filter))
}