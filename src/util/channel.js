import { extension_id } from '../config/definitions';

export default (function () {

    function sendMessage(message, callback) {

        return new Promise((resolve, reject) => {

            try {
                console.log(message);
                window.chrome.runtime.sendMessage(
                    extension_id,
                    message,
                    function (result) {
                        console.log('result', result)
                        resolve(result);
                    }
                );

            }
            catch (e) {
                console.log('Channel:sendMessage\n', e);
                reject(e);
            }
        });
    }

    return {
        sendMessage: sendMessage
    };
})();