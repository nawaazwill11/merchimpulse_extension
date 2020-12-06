import channel from "./channel";

const defaults = {
    auth_token: '',
    subs: '',
    state: 'base',
    bookmarks: [],
    tab: '',
    recent_filter: '',
    error: false,
    count: 0,
};


async function validateData(response) {

    try {

        // console.log('validating...');

        const storage_identifiers = Object.keys(defaults);
        const to_set = {};

        if (!Object.keys(response).length) {
            await channel.sendMessage({
                type: 'STORAGE_SET',
                data: defaults
            });
            return [null, defaults];
        }

        storage_identifiers.forEach((key) => {
            if (response[key] === undefined) {
                to_set[key] = defaults[key];
            }
        });

        await channel.sendMessage({
            type: 'STORAGE_SET',
            data: to_set
        });
        
        const app_data = {...response, ...to_set};

        return [null, app_data];

    }
    catch (error) {
        console.error(error);
        return [error]
    }


}

export { validateData }