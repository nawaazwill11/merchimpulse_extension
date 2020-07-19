import validator from 'email-validator';

export const extension_id = 'alfiagindfcaggjeofolfdifnlciilgm';

export const validations = {
    credentials: function (email, password) {
        const errors = {};

        if (!validator.validate(email)) 
            errors.email = 'Invalid email';

        if (!password.match(/^.{8,25}$/)) 
            errors.password = 'Password should be between 8 to 15 characters';
        
        return errors;
    }
}