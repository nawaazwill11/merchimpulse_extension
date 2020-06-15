// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
   // Replace all rules ...
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      // With a new rule ...
      chrome.declarativeContent.onPageChanged.addRules([
         {
            // That fires when a page's URL contains a 'g' ...
            conditions: [
               new chrome.declarativeContent.PageStateMatcher({
                  pageUrl: { urlContains: 'localhost' },
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
            // And shows the extension's page action.
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

function setToStorage(key, value, callback) {

   chrome.storage.sync.set(
      { [key]: value },
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
            setToStorage(request.key, request.value, function () {
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
