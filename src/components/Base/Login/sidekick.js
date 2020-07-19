import { validations, message_def } from "../../../config/definitions";

function handleLogin(app) {

    // app.message.set({
    //     name: 'login',
    //     nextState: 'main'
    // });

    const email = document.querySelector('input[name="email"').value;
    const password = document.querySelector('input[name="password"').value;

    const errors = validations.credentials(email, password);

    if (errors) {
        app.message.set(message_def.authentication.error(errors));
    }
    else {
        app.message.set(message_def.authentication.success());
    }

}


export { handleLogin };