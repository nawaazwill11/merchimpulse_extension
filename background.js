window.chrome.runtime.onInstalled.addListener(function () {
	window.chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		window.chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'localhost' },
					}),
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'merchimpulse.com' },
					}),
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'https://www.tmdn.org/tmview/api/search/' },
					}),
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.com' },
					}),
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.de' },
					}),
					new window.chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.co.uk' },
					})
				],
				actions: [new window.chrome.declarativeContent.ShowPageAction()]
			}
		])
	})
})

const server = function (request, response) {

	console.log(request)

	switch (request.action) {
		case 'STORAGE_GET':
			return (
				window.chrome.storage.sync.get(request.key, (value) => response(value[request.key]))
			)

		case 'STORAGE_SET':
			console.log(request)
			return (
				window.chrome.storage.sync.set({ [request.key]: request.value }, () => response())
			)

		case 'GET_TAB_ID':
			return (
				window.chrome.tabs.query({ active: true }, function (tabs) {
					response({
						tab_id: tabs[0].id
					})
				})
			)

		case 'SET_TAB_ID':
			return (
				window.chrome.storage.sync.set({ tab_id: request.tab_id }, function () {
					response()
				})
			)

		case 'OPEN_TAB':
			return (
				window.chrome.tabs.create({ url: request.url, active: false }, function () {
					response()
				})
			)

		case 'DATA':
			return (
				window.chrome.storage.sync.get('tab_id', function ({ tab_id }) {
					console.log(tab_id)
					window.chrome.tabs.sendMessage(tab_id, { action: 'receiveTrademarkData', data: request.data }, () => { })
				})
			)
	}
}

window.chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		server(request, sendResponse)
		return true
	}
)

window.chrome.runtime.onMessageExternal.addListener(
	function (request, sender, sendResponse) {
		server(request, sendResponse)
		return true
	}
)
