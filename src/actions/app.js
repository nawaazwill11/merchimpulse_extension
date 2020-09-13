/* eslint-disable no-prototype-builtins */
import { createAction } from 'redux-actions'
import { PING_ROUTE, getStorageData } from '../config/definitions'
import { setState, setActive, setSearchCount } from './dashboard'
import { setActiveFilter } from '../actions/dashboard'

export const SET_VIEW = 'SET_VIEW'
export const SET_DATA = 'SET_DATA'
export const SET_LOADER = 'SET_LOADER'
export const SET_AUTH = 'SET_AUTH'

export const setView = createAction(SET_VIEW)
export const setData = createAction(SET_DATA)
export const setLoader = createAction(SET_LOADER)
export const setAuth = createAction(SET_AUTH)

const setInitialState = (dispatch) => {
	dispatch(setData({
		auth: false,
		view: 'welcome',
		data: {},
	}))
}

export const loadData = () => (dispatch) => {
	console.log('loading data')
	const auth_token = window.localStorage.getItem('auth_token')

	if (!auth_token) return setInitialState(dispatch)

	return fetch(PING_ROUTE, {
		method: 'POST',
		headers: new Headers({
			Authorization: auth_token,
		})
	})
		.then((response) => response.json())
		.then((response) => {
			console.log(response)
			if (response.error) {
				window.localStorage.setItem('auth_token', '')
				setInitialState(dispatch)
			}
			else {
				const { subs, refreshed, token } = response
				if (refreshed) {
					console.log('refreshed')
					window.localStorage.setItem('auth_token', token)
				}
				const data = getStorageData()
				const active = data.hasOwnProperty('active') ? data.active : false
				const filter = data.hasOwnProperty('filter') ? data.filter : ''
				dispatch(setState(subs.type))
				dispatch(setSearchCount(subs.count))
				dispatch(setActive(active))
				dispatch(setActiveFilter(filter))
				dispatch(setView('dashboard'))

			}
			dispatch(setLoader(false))
		})
		.catch((error) => {
			console.error(error)
			dispatch(setInitialState(dispatch))
		})

}
