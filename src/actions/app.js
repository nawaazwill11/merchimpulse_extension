import { createAction } from 'redux-actions'

export const SET_VIEW = 'SET_VIEW'
export const SET_DATA = 'SET_DATA'

export const setView = createAction(SET_VIEW)
export const setData = createAction(SET_DATA)