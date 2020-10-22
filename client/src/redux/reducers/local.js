import { combineReducers } from 'redux';

import {
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_OUT_REQUEST
} from '../constants/auth';

import { CHANGE_LANGUAGE } from '../constants/local'


const initialState = {
    userAccess: {},
    isAuthenticated: false,
    language: 'en'
};


const userAccess = (state = initialState.userAccess, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return { ...action.data };
        case LOG_IN_FAIL:
        case LOG_OUT_REQUEST:
            return {};
        default:
            return state;
    }
};

const isAuthenticated = (state = initialState.isAuthenticated, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return true;
        case LOG_IN_FAIL:
        case LOG_OUT_REQUEST:
            return false;
        default:
            return state;
    }
};

const language = (state = initialState.language, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return action.lng;
        default:
            return state;
    }
};


export default combineReducers({
    userAccess,
    isAuthenticated,
    language
});