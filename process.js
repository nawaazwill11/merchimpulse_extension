!function () {
	const localStoreKey = 'app_data'
	const authTokenKey = 'auth_token'
	const filterKey = 'filter'
	const activeKey = 'active'
	const container_selector = '_mi_injected_element'

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
	const filter = localStore.get(filterKey).toLowerCase()
	const active = localStore.get(activeKey)

	function filterRedirect() {
		const regex = new RegExp('https://www.amazon..*/.*?.*=.*')
		const filter_string = `&i=fashion-novelty&hidden-keywords=${filter}`
		const filter_options = [
			't-shirt',
			'premium',
			'popsocket',
			'sweatshirt',
			'longsleeve'
		]
		if (
			window.location.href.match(regex)
			&& filter
			&& filter_options.includes(filter)
			&& !window.location.href.match(filter_string)
		) window.location.href = window.location.href + filter_string
	}

	const injectContainer = () => (
		new Promise((resolve, reject) => {
			try {
				const el = document.querySelector('.s-search-results')
				if (!el) return reject('Failed to inject extension.')
				const container_el = document.createElement('div')
				container_el.id = container_selector
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

	function pingServer() {
		if (auth_token) {
			return (
				fetch('https://merchimpulse.com/api/ping', {
					method: 'POST',
					headers: new Headers({
						Authorization: auth_token,
					}),
				})
			)
		}
		return Promise.resolve(false)
	}

	window.addEventListener('load', function () {
		filterRedirect()
		pingServer()
			.then((response) => response ? response.json() : Promise.resolve({}))
			.then((response) => {
				if (response.error) return localStore.set(authTokenKey, '')
				if (
					response.success
					&& (response.subs.type === 'pro' || response.subs.count < 11)
					&& active
				) {
					injectContainer()
						.then(() => appendScripts())
						.then(() => {})
						.catch((error) => console.log(error))
				}
			})
	})
}()