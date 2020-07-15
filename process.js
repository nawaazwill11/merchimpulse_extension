window.addEventListener('load', function () {
	inject.insertContainer()
		.then(() => {
			alert('container inserted');
			inject.appendScripts()
		})
});



(async function () {

	// used for trademark purposes
	function trademarkCheck() {

		const regex = new RegExp('https://www.tmdn.org/tmview/api/search/*')

		if (window.location.href.match(regex)) {

			const data = JSON.parse(document.body.innerText);

			chrome.runtime.sendMessage({ type: 'DATA', data: data, key: 'tab' });

			window.close();
		}
	}

	// applies filter
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
			)

		}

	}

	let trigger = false;

	const storage_keys = [
		'auth_token',
		'subs',
		'state',
		'bookmarks',
		'tab',
		'recent_filter',
		'error',
	];

	const storage_key_def = {
		auth_token: '',
		subs: false,
		state: false,
		bookmarks: [],
		tab: '',
		recent_filter: '',
		error: '',
	};

	const keypairs = {};

	function bookstrap() {

		console.log('bootstrapping initiated');

		return new Promise((resolve) => {

			chrome.storage.sync.get(storage_keys, function (response) {

				const undefined_keys = []; // stores keys unset in storage

				storage_keys.forEach((key) => {
					if (response[key] !== undefined) {
						keypairs[key] = response[key]; // store values for later uses
						return;
					}
					undefined_keys.push(key); // add keys with undefined values
				});

				const finishBootstrapping = function (state) {
					console.log('bootstrapping finished');
					resolve(state);
				};

				// if all key-value are defined, end bootstrap
				if (!undefined_keys.length) finishBootstrapping(keypairs);

				// set values of each key with undefined value
				undefined_keys.forEach((key) => {
					chrome.storage.sync.set({ [key]: storage_key_def[key] }, function () {
						// end when all keys are set
						if (key === undefined_keys[undefined_keys.length - 1])
							finishBootstrapping(keypairs);
					});
				});

			});
		});
	}


	function hasError(error) {


	}


	function logout(error) {
		chrome.storage.sync.set({ error: error })
		chrome.storage.sync.set({ auth_token: '' })
	}

	function handleError(error) {
		console.log(error);
	}
	function invalidSubs() {
		console.log('invalid subscription');
	}
	function updateToken() {
		// update token in storage
		console.log('token updated');
	}

	async function initiate() {
		const keypairs = await bookstrap();

		if (keypairs.error) 
			return hasError(keypairs.error);

		if (!keypairs.state) return handleError('App Inactive');
		if (!keypairs.auth_token) return handleError('Unauthenticated');

		const response_obj = await(
			fetch('http://localhost:8000/api/ping', {
				method: 'POST',
				headers: {
					Authorization: keypairs.auth_token
				}
			})
		);
		const response = await response_obj.json();

		if (response.error)
			return logout(error);

		if (response.refreshed)
			updateToken(response.token);

		if (!response.subs)
			return invalidSubs();


		await inject.insertContainer();
		inject.appendScripts();
	}

	// add window events
	window.addEventListener('load', function (e) {
		trademarkCheck();
		filterRedirect()
		// initiate();
	});


})();