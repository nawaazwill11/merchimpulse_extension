// window.addEventListener('load', function () {
// 	inject.insertContainer()
// 		.then(() => {
// 			alert('container inserted');
// 			inject.appendScripts()
// 		})
// });



(async function () {

	/**
	 * Checks for trademark
	 * 1. Watches for tmdn.org's search page.
	 * 2. Extracts JSON data from the tradmark page
	 * 3. Sends a message with the JSON data indicating the trademark of the search term
	 * 4. Closes the tmdn.org's search page.
	 */
	function trademarkCheck() {

		const regex = new RegExp('https://www.tmdn.org/tmview/api/search/*')

		if (window.location.href.match(regex)) {

			const data = JSON.parse(document.body.innerText);

			chrome.runtime.sendMessage({ type: 'DATA', data: data, key: 'tab' });

			window.close();
		}
	}

	/**
	 * Redirect the Amazon search page according the seletect filter.
	 * 1. Matches the amazon search URL.
	 * 2. Modifies the URL according to the corresponding filter.
	 * 3. Redirect the page.
	 */
	function filterRedirect() {

		const regex = new RegExp('https:\/\/www\.amazon\..*\/.*?.*=.*');

		if (window.location.href.match(regex)) {
			chrome.runtime.sendMessage(
				{ type: 'STORAGE_GET', key: 'recent_filter' },
				function (filter) {
					if (filter) {
						if (!window.location.href.match(filter)) {
							const url = (
								window.location.href +
								`&i=fashion-novelty&hidden-keywords=${filter}`
							);
							window.location.href = url;
						}
					}
				}
			);
		}
	}

	// let trigger = false;

	// const storage_identifiers = [
	// 	'auth_token',
	// 	'subs',
	// 	'state',
	// 	'bookmarks',
	// 	'tab',
	// 	'recent_filter',
	// 	'error',
	// ];

	/**
	 * A definition of keys with default values 
	 * that are required to run the app.
	 */
	const defaults = {
		auth_token: '',
		subs: '',
		state: 'base',
		bookmarks: [],
		tab: '',
		recent_filter: '',
		error: false,
		count: 0,
	};

	/**
	 * An array of required storage keys
	 */
	const storage_identifiers = Object.keys(defaults);

	const data = {};
	const error_stack = [];

	async function setToStorage(data) {

		console.log(data);

		return new Promise((resolve, reject) => {
			try {
				chrome.storage.sync.set(data, () => resolve());
			}
			catch (error) {
				error_stack.push('Failed at setToStorage():\n', error);
				reject();
			}
		});
	}

	async function setDefault(keys) {

		return new Promise(async (resolve, reject) => {

			try {
				const to_default = (
					!keys
						? defaults
						: (
							keys.reduce((keys_object, key) => {
								keys_object[key] = defaults[key]
								return keys_object;
							}, {})
						)
				);

				await setToStorage(to_default);
				resolve();
			}
			catch (error) {
				error_stack.push('Failed at setDefault()\n' + error);
				reject();
			}
		});
	}


	function setErrorState() {
		error_stack.forEach((error) => {
			console.log(error);
		});
		setToStorage({ error: true });
	}

	/**
	 * Fetches keys from local storage and set un-assigned or
	 * undefined keys to default values.
	 */
	function bookstrap() {

		console.log('bootstrapping initiated');
		return new Promise(async (resolve, reject) => {

			try {

				chrome.storage.sync.get(storage_identifiers, async function (response) {

					try {

						const undefined_keys = []; // stores keys unset in storage

						// checks keys from response against required keys
						// adds un-assigned keys to undefined_keys array
						storage_identifiers.forEach((key) => {
							if (response[key] !== undefined) {
								data[key] = response[key]; // store values for later uses
								return;
							}
							data[key] = defaults[key];
							undefined_keys.push(key); // add keys with undefined values
						});

						const finishBootstrapping = function (state) {
							console.log('bootstrapping finished');
							resolve(state);
						};

						// if all key-value are defined, end bootstrap
						if (undefined_keys.length)
							// set values of each key with undefined value
							await setDefault(undefined_keys);
						return finishBootstrapping(data);
					}
					catch (error) {
						error_stack.push('Failed at bootstrap:promise\n' + error);
						setErrorState();
					}
				});

			}
			catch (error) {
				error_stack.push('Failed at bootstrap()\n' + error);
				reject();
			}
		});
	}


	async function fetchUserInfo(data) {

		const response_obj = await fetch('http://localhost:8000/api/ping', {
			method: "POST", 
			headers: { 
				"Authorization": data.auth_token 
			}
		})

		const { error, payload } = await response_obj.json();
		console.log(error, payload);
		if (error) {
			await setDefault();
			error_stack.push(error);
			setErrorState();
		}
		else {
			const { access_token, subs, count } = payload;
			const to_update = {};
			if (payload.token_refreshed) {
				to_update.push({ access_token: access_token });
			}
			to_update.subs = subs.type;
			to_update.count =  subs.count;
			setToStorage({ ...to_update });
		}

	}


	async function initiate() {
		try {

			const data = await bookstrap();
			if (data.auth_token) {
				await fetchUserInfo(data);
			}
			// await inject.insertContainer();
			// inject.appendScripts();
		}
		catch (error) {
			error_stack.push('Failed at initiate()\n' + error);
			setErrorState();
		}
	}

	// add window events
	window.addEventListener('load', function (e) {
		try {
			trademarkCheck();
			filterRedirect()
			initiate();
		}
		catch (error) {
			setErrorState();
		}
	});
})();