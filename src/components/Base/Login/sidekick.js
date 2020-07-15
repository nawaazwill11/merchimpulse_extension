function handleLogin(app) {

    app.message.set({
        name: 'login',
        nextState: 'main'
    });
}


export { handleLogin };