import validator from 'email-validator'

require('dotenv').config()

export const extension_id = 'anefmjkkelhnceplpbmoakibocfoimlo'

// export const extension_id = 'gcfhlcjmpnknffcpblnadkljicabdnfn';

export const server_uri = process.env.SERVER_HOST || 'http://localhost:8000'
export const route = (path) => `${server_uri}/${path}`
export const HISTORY_ROUTE = route('dashboard/analysis')
export const BOOKMARKS_ROUTE = route('dashboard/analysis/bookmarks')
export const SETTINGS_ROUTE = route('dashboard/settings')
export const PROFILE_ROUTE = route('dashboard/profile')
export const GUMROAD_ROUTE = 'https://gumroad.com'
export const SIGNIN_ROUTE = route('api/signin')
export const PING_ROUTE = route('api/ping')

export const validations = {
	credentials: function ({ email, password }) {

		const errors = []

		if (!validator.validate(email))
			errors.push('Email malformed')

		if (!password.match(/^.{8,25}$/))
			errors.push('Password should be minimum 8 characters')

		return errors.length ? errors : null
	}
}

export const message_def = {
	authentication: {
		success: function () {
			return {
				header: 'Login Success',
				bg: '#F57200',
				nextState: 'main'
			}
		},
		error: function (errors) {
			return {
				header: 'Login Failed',
				bg: 'red',
				errors: errors
			}
		}
	},
	state: {
		expired: function () {
			return {
				header: 'Trial Period over',
				bg: 'red'
			}
		}
	},
	logout: function () {
		return {
			header: 'Logged out',
			bg: "#F57200",
			nextState: 'base'
		}
	}

}

// export const api_routes = {
// 	login: api_server + '/api/login',
// }

// export const api = {
// 	login: function (credentials) {
// 		return fetch(api_routes.login, {
// 			method: "POST",
// 			headers: new Headers({
// 				'Content-Type': 'application/json',
// 			}),
// 			body: JSON.stringify(credentials)
// 		})
// 	}
// }

const app_data_identifier = 'app_data'

export function getStorageData() {
	const data_string = window.localStorage.getItem(app_data_identifier)
	console.log(data_string)
	let data
	try {
		data = JSON.parse(data_string)
		console.log(data)
	} catch (error) { console.log(error) }
	if (!data) return {}
	return data
}

export function setStorageData(key, value) {
	const data = getStorageData()
	data[key] = value
	window.localStorage.setItem(app_data_identifier, JSON.stringify(data))
}
