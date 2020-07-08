(async function () {

	const storage_keys = [
		'auth_token',
		'subs',
		'state',
		'bookmarks',
		'tab',
		'recent_filter',
	];

	const storage_key_def = {
		auth_token: '',
		subs: false,
		state: false,
		bookmarks: [],
		tab: '',
		recent_filter: ''
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
						return ;
					}
					undefined_keys.push(key); // add keys with undefined values
				});

				const finishBootstrapping = function (state) {
					console.log('bootstrapping finished');
					resolve(state);
				};

				// if all key-value are defined, end bootstrap
				if (!undefined_keys.length) finishBootstrapping(response.state);

				// set values of each key with undefined value
				undefined_keys.forEach((key) => {
					chrome.storage.sync.set({ [key]: storage_key_def[key] }, function () {
						// end when all keys are set
						if (key === undefined_keys[undefined_keys.length - 1]) 
							finishBootstrapping(response.state);
					});
				});

			});
		});
	}

	const state = await bookstrap();
	if (!state || keypairs.auth_token) return;

	const response_obj = await fetch('http://localhost:8000/api/ping');
	const {error, auth, } = response_obj.json();


})();