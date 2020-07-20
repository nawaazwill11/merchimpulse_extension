import { validations, message_def, api } from "../../../config/definitions";
import channel from '../../../util/channel';

function handleError(errors) {

    const app = this.app;
    app.message.set(message_def.authentication.error(errors));

}

function clean(value) {

    const operations = [
        (value) => value.trim(),
    ];

    operations.forEach((operation) => value = operation(value));

    return value;
}


function createCredentials(email, password) {

    const credentials = {
        email: clean(email),
        password: clean(password)
    };
    const error = validations.credentials(credentials);

    return [error ? error : null, credentials];
}

async function authenticate(credentials) {

    try {
        const response = await api.login(credentials);
    
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return {error: 'Failed to contact server'}
    }

}

async function setStorage(payload) {

    try {
        const data = {
            auth_token: payload.auth_token,
            subs: payload.subs
        };

        await channel.sendMessage({
            type: 'STORAGE_SET',
            data: data
        });
    }
    catch (error) {
        console.error(error);
        return 'Failed to read response or storage data';
    }
}

async function handleLogin(app) {

    const error = handleError.bind({ app: app });

    try {

        const email = document.querySelector('input[name="email"').value;
        const password = document.querySelector('input[name="password"').value;

        const [credentials_error, credentials] = createCredentials(email, password);

        if (credentials_error) return error(credentials_error);

        const { errors: auth_error, payload } = await authenticate(credentials);
        console.log(auth_error);

        if (auth_error) return error(auth_error);

        const storage_error = await setStorage(payload);
        console.log(storage_error);

        if (storage_error) return error(storage_error);

        app.message.set(message_def.authentication.success());

    }
    catch (errors) {
        console.log(errors.toString());
        return error(errors.message);
    }
}


export { handleLogin };