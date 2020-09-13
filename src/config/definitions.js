import validator from 'email-validator'
require('dotenv').config()

export const extension_id = 'anefmjkkelhnceplpbmoakibocfoimlo'

// export const extension_id = 'gcfhlcjmpnknffcpblnadkljicabdnfn';

export const server_host = process.env.SERVER_ADDRESS || 'http://127.0.0.1'
export const server_port = process.env.PORT || 8000
export const server_uri = `${server_host}:${server_port}`
export const api_server = `${server_uri}/api`

export const HISTORY_ROUTE = `${server_uri}/dashboard/analysis`
export const BOOKMARK_ROUTE = `${server_uri}/dashboard/bookmarks`

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
			bg: '#F57200',
			nextState: 'base'
		}
	}

}

export const api_routes = {
	login: api_server + '/login',
}

export const api = {
	login: function (credentials) {
		return fetch(api_routes.login, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(credentials)
		})
	}
}