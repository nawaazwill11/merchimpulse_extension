function getFromStorage(keys) {

    return new Promise((resolve, reject) => {

        chrome.storage.sync.get([keys], function (response) {

            if (chrome.runtine.lastError) {
                reject(chrome.runtime.lastError.message);
            }

            resolve(response);

        });

    });
}

function setToStorage(value_obj) {

    return new Promise((resolve, reject) => {

        chrome.storage.sync.set(value_obj, () => resolve(true));

    });

}