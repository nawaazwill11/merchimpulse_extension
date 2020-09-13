import { createAction } from 'redux-actions'

export const SET_STATE = 'SET_STATE'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'

export const setState = createAction(SET_STATE)
export const setActive = createAction(SET_ACTIVE)
export const setActiveFilter = createAction(SET_ACTIVE_FILTER)

