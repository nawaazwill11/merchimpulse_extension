/* eslint-disable no-prototype-builtins */
import { createAction } from 'redux-actions'
import { validate as emailValidate } from 'email-validator'

import {
	PING_ROUTE,
	localStore,
	authTokenKey,
	filterKey,
	activeKey,
	SIGNIN_ROUTE
} from '../config/definitions'
import { setOverlay } from './overlay'
import { setState, setActive, setSearchCount } from './dashboard'
import { setActiveFilter } from '../actions/dashboard'

export const SET_VIEW = 'SET_VIEW'
export const SET_DATA = 'SET_DATA'
export const SET_APP = 'SET_APP'
export const SET_LOADER = 'SET_LOADER'
export const SET_AUTH = 'SET_AUTH'

export const setView = createAction(SET_VIEW)
export const setData = createAction(SET_DATA)
export const setApp = createAction(SET_APP)
export const setAuth = createAction(SET_AUTH)

export const signIn = (email, password) => (dispatch) => {
	console.log(email, password)
	const errors = []
	if (!emailValidate(email)) errors.push('Email format incorrect')
	if (!password.match(/^.{8,25}$/)) errors.push('Password should be between 8-64 characters')
	if (errors.length) {
		return dispatch(setOverlay({ active: true, message: errors }))
	}

	return fetch(SIGNIN_ROUTE, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({ email, password })
	})
		.then((response) => response.json())
		.then((response) => {
			console.log('response', response)
			if (response.error) {
				return dispatch(setOverlay({
					active: true,
					title: 'Unauthorized',
					message: [response.error]
				}))
			}

			localStore.set(authTokenKey, response.payload.auth_token)

			return dispatch(setApp({
				auth: true,
				view: 'dashboard',
			}))

		})
}

const setInitialState = (dispatch) => {
	dispatch(setData({
		auth: false,
		view: 'welcome',
		data: {},
	}))
}

export const loadData = () => (dispatch) => {
	console.log('loading data')
	const auth_token = localStore.get(authTokenKey)
	console.log(auth_token)
	if (!auth_token) {
		console.log('itthe')
		return setInitialState(dispatch)

	}

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
				console.log(subs)
				if (refreshed) {
					console.log('refreshed')
					window.localStorage.setItem('auth_token', token)
				}
				const data = localStore.get()
				const active = data.hasOwnProperty('active') ? data.active : false
				const filter = data.hasOwnProperty('filter') ? data.filter : ''
				dispatch(setState(subs.type))
				dispatch(setSearchCount(subs.count))
				dispatch(setActive(active))
				dispatch(setActiveFilter(filter))
				dispatch(setView('dashboard'))
			}
		})
		.catch((error) => {
			console.error(error)
			dispatch(setInitialState(dispatch))
		})

}


export const logout = () => (dispatch) => {
	localStore.set(authTokenKey, '')
	dispatch(setAuth(false))
	dispatch(setView('welcome'))
}