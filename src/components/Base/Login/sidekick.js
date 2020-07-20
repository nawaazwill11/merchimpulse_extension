import { validations, message_def, api } from "../../../config/definitions";
import channel from '../../../util/channel';

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

    const response = await api.login(credentials);

    return await response.json();
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
    catch(error) {
        return error;
    }
}

async function handleLogin(app) {

    try {
        const email = document.querySelector('input[name="email"').value;
        const password = document.querySelector('input[name="password"').value;
    
        const [credentials_error, credentials] = createCredentials(email, password);
    
        if (credentials_error) throw new Error(credentials_error);
    
        const { error: login_error, payload } = await authenticate(credentials);
    
        if (login_error) throw new Error([login_error]);

        const storage_error = await setStorage(payload);
        console.log(storage_error);
        if (storage_error) throw new Error([storage_error]);

        app.message.set(message_def.authentication.success());
        
    }
    catch (errors) {
        console.error(errors);
        app.message.set(message_def.authentication.error(errors));
    }
}


export { handleLogin };