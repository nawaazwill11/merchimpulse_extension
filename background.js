const chrome = window.chrome

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

