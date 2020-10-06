chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'localhost' },
					}),
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'merchimpulse.com' },
					}),
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'https://www.tmdn.org/tmview/api/search/' },
					}),
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.com' },
					}),
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.de' },
					}),
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'amazon.co.uk' },
					})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		])
	})
})

const server = function (request, response) {

	console.log(request)

	switch (request.action) {
		case 'GET_TAB_ID':
			return (
				chrome.tabs.query({ active: true }, function (tabs) {
					response({
						tab_id: tabs[0].id
					})
				})
			)

		case 'SET_TAB_ID':
			return (
				chrome.storage.sync.set({ tab_id: request.tab_id }, function () {
					response()
				})
			)

		case 'OPEN_TAB':
			return (
				chrome.tabs.create({ url: request.url, active: false }, function () {
					response()
				})
			)

		case 'DATA':
			return (
				chrome.storage.sync.get('tab_id', function ({ tab_id }) {
					console.log(tab_id)
					chrome.tabs.sendMessage(tab_id, { action: 'receiveTrademarkData', data: request.data }, () => { })
				})
			)

	}
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {

		server(request, sendResponse)

		return true

	}
)

chrome.runtime.onMessageExternal.addListener(
	function (request, sender, sendResponse) {

		server(request, sendResponse)

		return true

	}
)
