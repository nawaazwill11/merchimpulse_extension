function isTokenRejectable(token) {

    const reject_list = [
        null,
        undefined,
        ''
    ];

    return reject_list.some((item) => token === item);

}

const login = function () {

    function withToken(token) {
        // api call to server with token
    }

    function fresh() {
        // api call to server without token
    }

    return {
        withToken: withToken,
        fresh: fresh
    }

}();