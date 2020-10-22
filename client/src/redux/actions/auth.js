import * as c from '../constants/auth';

export const authSignIn = (email, password) => ({
    type: c.LOG_IN_REQUEST,
    email,
    password
});

export const authSignUp = (firstName, lastName, email, password) => ({
    type: c.SIGN_UP_REQUEST,
    firstName,
    lastName,
    email,
    password
});

export const authLogOut = () => ({
    type: c.LOG_OUT_REQUEST,
});

