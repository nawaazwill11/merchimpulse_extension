let trigger = true;

// fetch scripts from server for subscription implementation.

const storage_keys = [
	'state',
	'bookmarks',
	'tab',
	'recent_filter',
];

const storage_key_def = {
	state: false,
	bookmarks: [],
	tab: '',
	recent_filter: ''
}

function bookstrap() {
	console.log('bootstrapping initiated');
	return new Promise((resolve) => {
		chrome.storage.sync.get(storage_keys, function (response) {

			const undefined_keys = [];

			storage_keys.forEach((key) => response[key] === undefined ? undefined_keys.push(key) : '');

			const finishBootstrapping = function () {
				console.log('bootstrapping finished');
				resolve(response.state);
			};

			if (!undefined_keys.length) finishBootstrapping();

			undefined_keys.forEach((key) => {
				chrome.storage.sync.set({[key]: storage_key_def[key]}, function () {
					if (key === undefined_keys[undefined_keys.length - 1]) finishBootstrapping(response.state);
				});
			});

		});
	});
}


(function initiate() {
	bookstrap()
		.then((state) => {
			console.log(state);
			if (state && trigger) {
				inject.insertContainer()
					.then(() => {
						inject.appendScripts()
						trigger = false;
					})
			}
		})
})()



function toggleBookmarkStyle() {

	const element = document.querySelector('#_bookmark_');

	const tick = element.children[1];
	tick.remove();
	
	// let border_color = 'white';
	// let title = 'Add to bookmark';

	// element.style.borderColor = border_color;
	// element.setAttribute('title', title);

}


function receiveTrademarkData(data) {


	const trademark_indicator = document.querySelector('#_trademark-indicator_');

	if (data.tradeMarks.length) {
		trademark_indicator.dataset.found = true;
	}
	else {
		trademark_indicator.dataset.found = false;
	}

	trademark_indicator.click();

}


chrome.runtime.onMessage.addListener(
	(request, sender, response) => {

		switch (request.action) {

			case 'toggleBookmarkStyle':
				if (request.url === window.location.href) {
					toggleBookmarkStyle();
				}
				response({});
				break;

			case 'receiveTrademarkData':
				console.log(request.data);
				receiveTrademarkData(request.data);

		}

	}
)

const regex = new RegExp('https://www.tmdn.org/tmview/api/search/*')

if (window.location.href.match(regex)) {

	const data = JSON.parse(document.body.innerText);

	chrome.runtime.sendMessage({ type: 'DATA', data: data, key: 'tab' });

	window.close();

}

