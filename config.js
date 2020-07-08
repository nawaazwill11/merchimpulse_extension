function onTokenAcquire(token) {
    /* 
        1. Empty or undefined token shows minimal ui.
        2. Non-empty token is checked for validity.
        3. If token is valid, response returns success with subscription info.
            3.1. If subscription is valid, set inject scripts and set ext. UI to complete.
            3.2. If not, then do not inject script and set ext. ui to expired.
        4. If token is invalid, shows minimal ui.

    */

    if (!token) {
        setAppState('minimal');
    }

    loginWithToken(token)
        .then((response) => {
            try {
                if (!response || response.loginSuccess === undefined) {
                    throw new Error('Something went wront. Please try again.')
                }

                if (response.loginSuccess) {
                    return setAppState('expired');
                }

                setAppState('complete');
                injectScripts();

            }
            catch (error) {
                console.error(error);
            }

        })
        .catch((error) => {
            console.error('Login failed with error:' + error);
        });

}

function onTokenAcquireFail(error) {

    console.log('Configuration error. Contact Merch Impulse team.');

}

function accessTokenCheck() {

    getStorage(['access_token'])
        .then(onTokenAcquire)
        .catch(onTokenAcquireFail)

}