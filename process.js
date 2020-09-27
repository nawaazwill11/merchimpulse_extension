const component_id = '_mi_injected_element'

const injectContainer = () => (
	new Promise((resolve, reject) => {
		try {
			const el = document.querySelector('.s-search-results')
			if (!el) return reject('Failed to inject extension.')
			const container_el = document.createElement('div')
			container_el.id = component_id
			const parent = el.closest('.sg-col-inner')
			parent.prepend(container_el)
			resolve()
		}
		catch (e) {
			reject(e)
		}
	})
)

const appendScripts = () => (
	new Promise((resolve, reject) => {
		try {
			const head = document.head
			const styles = [
				'bootstrap.min.css',
				'style.css',
			]
			styles.forEach((style) => {
				const stylesheet = document.createElement('link')
				stylesheet.href = window.chrome.extension.getURL(`static/css/${style}`)
				stylesheet.rel = 'stylesheet'
				head.append(stylesheet)
			})
			const body = document.body
			const scripts = ['script0.js', 'script1.js', 'script2.js']
			scripts.forEach((script) => {
				const script_el = document.createElement('script')
				script_el.type = 'text/javascript'
				script_el.src = window.chrome.extension.getURL(`static/js/${script}`)
				body.append(script_el)
			})
			resolve()
		}
		catch (error) {
			reject(error)
		}
	})
)


const localStoreKey = 'app_data'
const authTokenKey = 'auth_token'

const localStore = {
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

const auth_token = localStore.get(authTokenKey)
if (auth_token) {
	fetch('https://merchimpulse.com/api/ping', {
		method: 'POST',
		headers: new Headers({
			Authorization: auth_token,
		}),
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.error) return localStore.set(authTokenKey, '')
			if (response.subs.count < 11) {
				injectContainer()
					.then(() => appendScripts())
					.then(() => {})
					.catch((error) => console.log(error))
			}
		})
}