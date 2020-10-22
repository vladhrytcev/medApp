import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from "connected-react-router";
import { createLoaderReducers } from './utils';
import * as c from '../constants/adminPersonPannel';

const initialState = {
    usersList: [],
    currentUser: {},
    error: {},
};

const loaderReducers = createLoaderReducers({
    requestActions: [
        c.GET_PERSON_USERS_LIST_REQUEST,
        c.DELETE_PERSON_USERS_REQUEST,
        c.INVITE_USER_REQUEST,
        c.GET_CURRENT_PERSON_USER_REQUEST,
        c.CHANGE_CURRENT_USER_REQUEST,
    ],
    successActions: [
        c.GET_PERSON_USERS_LIST_SUCCESS,
        c.DELETE_PERSON_USERS_SUCCESS,
        c.INVITE_USER_SUCCESS,
        c.GET_CURRENT_PERSON_USER_SUCCESS,
        c.CHANGE_CURRENT_USER_SUCCESS,
    ],
    failActions: [
        c.GET_PERSON_USERS_LIST_FAIL,
        c.DELETE_PERSON_USERS_FAIL,
        c.INVITE_USER_FAIL,
        c.GET_CURRENT_PERSON_USER_FAIL,
        c.CHANGE_CURRENT_USER_FAIL,
    ],
});

const usersList = (state = initialState.usersList, action) => {
    switch (action.type) {
        case c.GET_PERSON_USERS_LIST_SUCCESS:
            return [ ...action.data ];
        case c.DELETE_PERSON_USERS_SUCCESS:
            const rowUsersList = [...state];
            const newUsersList = rowUsersList.filter(item => !action.ids.includes(item.id));
            return [...newUsersList];
        case c.GET_PERSON_USERS_LIST_FAIL:
            return [];
        default:
            return state;
    }
};

const currentUser = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case c.GET_CURRENT_PERSON_USER_SUCCESS:
            return { ...action.data };
        case c.GET_CURRENT_PERSON_USER_FAIL:
            return {};
        default:
            return state;
    }
};


const adminPannelError = (state = initialState.error, action) => {
    switch (action.type) {
        case c.GET_PERSON_USERS_LIST_SUCCESS:
        case c.DELETE_PERSON_USERS_SUCCESS:
            return {};
        case c.GET_PERSON_USERS_LIST_FAIL:
        case c.DELETE_PERSON_USERS_FAIL:
            return { ...action.error };
        default:
            return state;
    }
};



export default combineReducers({
    ...loaderReducers,
    usersList,
    currentUser,
    error: adminPannelError,
});