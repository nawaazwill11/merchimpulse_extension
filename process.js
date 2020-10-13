!function () {
	const authTokenKey = 'auth_token'
	const filterKey = 'filter'
	const activeKey = 'active'
	const container_selector = '_mi_injected_element'

	// const localStore = {
	// 	get: (key) => {
	// 		try {
	// 			const store = window.localStorage.getItem(localStoreKey)
	// 			const app_data = store ? JSON.parse(store) : {}
	// 			if (app_data && key) return app_data[key]
	// 			return app_data
	// 		} catch (error) { console.log(error); return null }
	// 	},
	// 	set: (key, value) => {
	// 		try {
	// 			const app_data = localStore.get()
	// 			app_data[key] = value
	// 			window.localStorage.setItem(localStoreKey, JSON.stringify(app_data))
	// 		} catch (error) { console.log(error); return null }
	// 	}
	// }

	const localStore = {
		get: (key) => (
			new Promise((resolve) => {
				window.chrome.storage.sync.get(key, (value) => resolve(value[key]))
			})
		),
		set: (key, value) => (
			new Promise((resolve) => {
				window.chrome.storage.sync.set({ key: value }, () => resolve())
			})
		)
	}

	function filterRedirect() {
		if (!filter) return null
		const filter_to_use = filter.toLowerCase()
		const regex = new RegExp('https://www.amazon..*/.*?.*=.*')
		// const regex = new RegExp('http://localhost:3000/')
		const filter_string = `&i=fashion-novelty&hidden-keywords=${filter_to_use}`
		const filter_options = [
			't-shirt',
			'premium',
			'popsocket',
			'sweatshirt',
			'longsleeve'
		]
		if (
			window.location.href.match(regex)
			&& filter_options.includes(filter_to_use)
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
					stylesheet.href = window.window.chrome.extension.getURL(`static/css/${style}`)
					stylesheet.rel = 'stylesheet'
					head.append(stylesheet)
				})
				const body = document.body
				const scripts = ['script0.js', 'script1.js', 'script2.js']
				scripts.forEach((script) => {
					const script_el = document.createElement('script')
					script_el.type = 'text/javascript'
					script_el.src = window.window.chrome.extension.getURL(`static/js/${script}`)
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
		console.log(auth_token)
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

	function trademarkCheck() {

		const regex = new RegExp('https://www.tmdn.org/tmview/api/search/*')

		if (window.location.href.match(regex)) {

			const data = JSON.parse(document.body.innerText)

			window.chrome.runtime.sendMessage({ action: 'DATA', data })
			
			window.close()
		}
	}

	function listenToTrademarkData() {
		window.chrome.runtime.onMessage.addListener((req, sender, res) => {
			console.log(req)
			if (req.action === 'receiveTrademarkData') {
				const bc = new window.BroadcastChannel('trademark')
				bc.postMessage(req.data)
				bc.close()
			}
			res({})
		})
	}
	let auth_token, filter, active

	window.addEventListener('load', async function () {
		auth_token = await localStore.get(authTokenKey)
		filter = await localStore.get(filterKey)
		active = await localStore.get(activeKey)

		trademarkCheck()
		listenToTrademarkData()
		filterRedirect()
		pingServer()
			.then((response) => response ? response.json() : Promise.resolve({}))
			.then(async (response) => {
				console.log(response)
				if (response.error) return await localStore.set(authTokenKey, '')
				if (
					response.success
					&& (response.subs.type === 'pro' || response.subs.count < 11)
					&& active
				) {
					injectContainer()
						.then(() => appendScripts())
						.then(() => { })
						.catch((error) => console.log(error))
				}
			})
	})
}()