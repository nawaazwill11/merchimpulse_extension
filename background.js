
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
      ]);
   });
});


function getFromStorage(key, callback) {

   const _key  = key ? [key] : null;

   chrome.storage.sync.get(_key, function (result) {

      console.log(result);
      
      if (!key) return callback(result);

      callback(result[key]);

   });

}

function setToStorage(data, callback) {

   chrome.storage.sync.set(
      data,
      callback
   );
}

const server = function (request, response) {

   console.log(request);

   switch (request.type) {
      case 'ASSET':

         const url = chrome.runtime.getURL(request.resource_name);
         return response({
            url: url
         });

      case 'STORAGE_GET':

         console.log(request);

         return (
            getFromStorage(request.key, function (result) {
               console.log(result);
               response(result);
            })
         );

      case 'STORAGE_SET':

         return (
            setToStorage(request.data, function () {
               response({});
            })
         );

      case 'GET_TAB_ID':

         return (
            chrome.tabs.query({ active: true }, function (tabs) {
               response({
                  tab_id: tabs[0].id
               });
            })
         );

      case 'OPEN_TAB':

         return (
            chrome.tabs.create({ url: request.url, active: request.focus }, function () {
               response();
            })
         );

      case 'DATA':

         return (
            getFromStorage(request.key, function (tab_id) {

               chrome.tabs.sendMessage(tab_id, { action: 'receiveTrademarkData', data: request.data });

            })
         );

   }
}



chrome.runtime.onMessage.addListener(
   function (request, sender, sendResponse) {

      server(request, sendResponse);

      return true;

   }
)

chrome.runtime.onMessageExternal.addListener(
   function (request, sender, sendResponse) {

      server(request, sendResponse);

      return true;

   }
)
