import validator from 'email-validator'

require('dotenv').config()

export const extension_id = 'anefmjkkelhnceplpbmoakibocfoimlo'

// export const extension_id = 'gcfhlcjmpnknffcpblnadkljicabdnfn';

// export const server_uri = 'http://localhost:8000'

export const server_uri = 'https://merchimpulse.com'
export const route = (path) => `${server_uri}/${path}`
export const HISTORY_ROUTE = route('dashboard/analysis')
export const BOOKMARKS_ROUTE = route('dashboard/analysis')
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

// export const localStore = {
// 	get: (key) => {
// 		return new Promise((resolve) => {
// 			try {
// 				const code = `localStorage.getItem('${localStoreKey}')`
// 				messenger(code)
// 					.then((store) => {
// 						console.log(store)
// 						const app_data = store ? JSON.parse(store) : {}
// 						if (key) return resolve(app_data[key])
// 						return resolve(app_data)
// 					})
// 			} catch (error) { console.log(error); return resolve(null) }
// 		})
// 	},
// 	set: (key, value) => {
// 		return new Promise((resolve) => {
// 			try {
// 				localStore.get()
// 					.then((store) => {
// 						store[key] = value
// 						const set_code = `localStorage.setItem('${localStoreKey}', '${JSON.stringify(store)}')`
// 						messenger(set_code)
// 							.then(() => resolve())

// 					})
// 			} catch (error) { console.log(error); return null }
// 		})
// 	}
// }


// export const localStore = {
// 	get: (key) => {
// 		return new Promise((resolve) => {
// 			try {
// 				const store = window.localStorage.getItem(localStoreKey)
// 				const app_data = store ? JSON.parse(store) : {}
// 				if (app_data && key) return resolve(app_data[key])
// 				return resolve(app_data)
// 			} catch (error) { console.log(error); return resolve(null) }
// 		})
// 	},
// 	set: (key, value) => {
// 		return new Promise((resolve) => {
// 			try {
// 				localStore.get()
// 					.then((store) => {
// 						store[key] = value
// 						window.localStorage.setItem(localStoreKey, JSON.stringify(store))
// 						return resolve()
// 					})
// 			} catch (error) { console.log(error); return resolve(null) }
// 		})
// 	}
// }

const messenger = (message, callback) => {
	window.chrome.runtime.sendMessage(extension_id, message, (response) => callback(response))
}

export const STORAGE_GET = 'STORAGE_GET'
export const STORAGE_SET = 'STORAGE_SET'

export const localStore = {
	get: (key) => (
		new Promise((resolve) => {
			messenger({ action: STORAGE_GET, key }, (value) => resolve(value))
		})
	),
	set: (key, value) => (
		new Promise((resolve) => {
			messenger({ action: STORAGE_SET, key, value }, () => resolve())
		})
	)
}