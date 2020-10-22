import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from "connected-react-router";
import { createLoaderReducers } from './utils';

import * as c from '../constants/auth';

const initialState = {
    data: {},
    error: {},
};

const loaderReducers = createLoaderReducers({
    requestActions: [
        c.LOG_IN_REQUEST,
        c.SIGN_UP_REQUEST,
    ],
    successActions: [
        c.LOG_IN_SUCCESS,
        c.SIGN_UP_SUCCESS,
    ],
    failActions: [
        c.LOG_IN_FAIL,
        c.SIGN_UP_FAIL,
    ],
});

const data = (state = initialState.data, action) => {
    switch (action.type) {
        case c.LOG_IN_SUCCESS:
        case c.SIGN_UP_SUCCESS:
            return { ...action.data };
        case c.LOG_IN_FAIL:
        case c.SIGN_UP_FAIL:
            return {};
        default:
            return state;
    }
};

const authError = (state = initialState.error, action) => {
    switch (action.type) {
        case c.LOG_IN_SUCCESS:
        case c.SIGN_UP_SUCCESS:
        case LOCATION_CHANGE:
            return {};
        case c.LOG_IN_FAIL:
        case c.SIGN_UP_FAIL:
            return { ...action.error };
        default:
            return state;
    }
};


export default combineReducers({
    ...loaderReducers,
    data,
    error: authError,
});