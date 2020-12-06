!function () {
	
	const authTokenKey = 'auth_token'
	const filterKey = 'filter'
	const activeKey = 'active'
	const container_selector = '_mi_injected_element'
	const HOST = 'https://merchimpulse.com'
	// const HOST = 'http://localhost:8000'
	let auth_token, filter, active

	const localStore = {
		get: (key) => (
			new Promise((resolve) => {
				window.chrome.storage.sync.get(key, (value) => resolve(value[key]))
			})
		),
		set: (key, value) => (
			new Promise((resolve) => {
				window.chrome.storage.sync.set({ [key]: value }, () => resolve())
			})
		)
	}

	function filterRedirect() {
		if (!filter) return null
		const filter_to_use = filter.toLowerCase()
		const regex = new RegExp('https:\/\/www.amazon.(com|co.uk|de)\/.*?.*=.*')
		// const regex = new RegExp('http://localhost:3000/')
		const filter_string = `&i=fashion-novelty&bbn=12035955011&rh=p_6%3AATVPDKIKX0DER&hidden-keywords=${filter_to_use}`
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
				fetch(`${HOST}/api/ping`, {
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

	window.addEventListener('load', async function () {
		try {
			auth_token = await localStore.get(authTokenKey)
			filter = await localStore.get(filterKey)
			active = await localStore.get(activeKey)

			trademarkCheck()
			listenToTrademarkData()
			filterRedirect()
			pingServer()
				.then((response) => response ? response.json() : Promise.resolve({}))
				.then(async (response) => {
					console.log('extension ping response:', response)
					// if (response.error) return await localStore.set(authTokenKey, '')
					if (
						response.success
						&& (response.subs.type === 'pro' || response.subs.count < 11)
						&& active
					) {
						injectContainer()
							.then(() => appendScripts())
							.catch((error) => console.log(error))
					}
				})
		} catch (error) {
			return null
		}
	})
}()