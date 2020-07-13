import { extension_id } from '../config/definitions';

export default (function () {
    
    function sendMessage(message, callback) {
        try {
            console.log(message);
            window.chrome.runtime.sendMessage(
                extension_id,
                message,
                function (result) {
                    console.log('result', result)
                    callback(result);
                }
            );

        }
        catch(e) {
            console.log('here', e);
        }

    }

    return {
        sendMessage: sendMessage
    }

})();