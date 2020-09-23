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
export const SIGNUP_WEB_ROUTE = route('signup')

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

export const filterKey = 'filter'
export const activeKey = 'active'
export const localStoreKey = 'app_data'
export const authTokenKey = 'auth_token'

export const localStore = {
	get: (key) => {
		try {
			const store = window.localStorage.getItem(localStoreKey)
			const app_data = store ? JSON.parse(store) : {}
			if (app_data && key) return app_data[key]
			return app_data
		} catch (error) { console.log(error); return null }
	},
	set: (key, value) => {
		try {
			const app_data = localStore.get()
			app_data[key] = value
			window.localStorage.setItem(localStoreKey, JSON.stringify(app_data))
		} catch (error) { console.log(error); return null }
	}
}