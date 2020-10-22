import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from "connected-react-router";
import { createLoaderReducers } from './utils';

import * as c from '../constants/adminPannel';

const initialState = {
    agenciesList: [],
    agencyUsersList: [],
    currentAgency: {},
    currentAgencyUser: {},
    agencyCustomersList: [],
    currentAgencyCustomer: {},
    error: {},
};

const loaderReducers = createLoaderReducers({
    requestActions: [
        c.GET_AGENCIES_LIST_REQUEST,
        c.DELETE_AGENCIES_REQUEST,
        c.GET_CURRENT_AGENCY_REQUEST,
        c.CHANGE_CURRENT_AGENCY_REQUEST,
        c.ADD_NEW_AGENCY_REQUEST,
        c.GET_USERS_FOR_CURRENT_AGENCY_REQUEST,
        c.DELETE_USERS_FOR_CURRENT_AGENCY_REQUEST,
        c.GET_CURRENT_AGENCY_USER_REQUEST,
        c.CHANGE_CURRENT_AGENCY_USER_REQUEST,
        c.INVITE_AGENCY_USER_REQUEST,
        c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST,
        c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST,
        c.INVITE_AGENCY_CUSTOMER_REQUEST,
        c.GET_CURRENT_AGENCY_CUSTOMER_REQUEST,
    ],
    successActions: [
        c.GET_AGENCIES_LIST_SUCCESS,
        c.DELETE_AGENCIES_SUCCESS,
        c.GET_CURRENT_AGENCY_SUCCESS,
        c.CHANGE_CURRENT_AGENCY_SUCCESS,
        c.ADD_NEW_AGENCY_SUCCESS,
        c.GET_USERS_FOR_CURRENT_AGENCY_SUCCESS,
        c.DELETE_USERS_FOR_CURRENT_AGENCY_SUCCESS,
        c.GET_CURRENT_AGENCY_USER_SUCCESS,
        c.CHANGE_CURRENT_AGENCY_USER_SUCCESS,
        c.INVITE_AGENCY_USER_SUCCESS,
        c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS,
        c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS,
        c.INVITE_AGENCY_CUSTOMER_SUCCESS,
        c.GET_CURRENT_AGENCY_CUSTOMER_SUCCESS,
    ],
    failActions: [
        c.GET_AGENCIES_LIST_FAIL,
        c.DELETE_AGENCIES_FAIL,
        c.GET_CURRENT_AGENCY_FAIL,
        c.CHANGE_CURRENT_AGENCY_FAIL,
        c.ADD_NEW_AGENCY_FAIL,
        c.GET_USERS_FOR_CURRENT_AGENCY_FAIL,
        c.DELETE_USERS_FOR_CURRENT_AGENCY_FAIL,
        c.GET_CURRENT_AGENCY_USER_FAIL,
        c.CHANGE_CURRENT_AGENCY_USER_FAIL,
        c.INVITE_AGENCY_USER_FAIL,
        c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_FAIL,
        c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_FAIL,
        c.INVITE_AGENCY_CUSTOMER_FAIL,
        c.GET_CURRENT_AGENCY_CUSTOMER_FAIL,
    ],
});

const agenciesList = (state = initialState.agenciesList, action) => {
    switch (action.type) {
        case c.GET_AGENCIES_LIST_SUCCESS:
            return [ ...action.data ];
        case c.DELETE_AGENCIES_SUCCESS:
            const newAgenciesList = state.filter(item => !action.ids.includes(item.id));
            return [...newAgenciesList];
        case c.ADD_NEW_AGENCY_SUCCESS:
            const newObj = {};
            newObj.id = action.id;
            newObj.name = action.agencyName;
            newObj.postcode = action.postcode;
            newObj.country = action.country;
            newObj.address = action.address;
            newObj.url = action.url;
            newObj.logo = action.logo;
            newObj.role = 'AGENCY';

            const newState = [...state, newObj];
        return [...newState];
        case c.GET_AGENCIES_LIST_FAIL:
            return [];
        default:
            return state;
    }
};

const agencyUsersList = (state = initialState.agencyUsersList, action) => {
    switch (action.type) {
        case c.GET_USERS_FOR_CURRENT_AGENCY_SUCCESS:
            return [ ...action.data ];
        case c.DELETE_USERS_FOR_CURRENT_AGENCY_SUCCESS:
            const newAgencyUsersList = state.filter(item => !action.ids.includes(item.id));
            return [...newAgencyUsersList];
        case c.GET_USERS_FOR_CURRENT_AGENCY_FAIL:
        case c.DELETE_USERS_FOR_CURRENT_AGENCY_FAIL:
            return [];
        default:
            return state;
    }
};

const currentAgency = (state = initialState.currentAgency, action) => {
    switch (action.type) {
        case c.GET_CURRENT_AGENCY_SUCCESS:
            return { ...action.data };
        case c.GET_CURRENT_AGENCY_FAIL:
        case c.CHANGE_CURRENT_AGENCY_FAIL:
        case LOCATION_CHANGE:
            return {};
        case c.CHANGE_CURRENT_AGENCY_SUCCESS:
            const newObject = {...state};
            action.arr.forEach(item => {
                newObject[item.field] = item.value;
            });
            return {...newObject};
        default:
            return state;
    }
};

const currentAgencyUser = (state = initialState.currentAgencyUser, action) => {
    switch (action.type) {
        case c.GET_CURRENT_AGENCY_USER_SUCCESS:
            return { ...action.data };
        case c.CHANGE_CURRENT_AGENCY_USER_SUCCESS:
            const newAgencyUser = {...state};
            action.arr.forEach(item => {
                newAgencyUser[item.field] = item.value;
            });
            return {...newAgencyUser};
        case c.GET_CURRENT_AGENCY_USER_FAIL:
            return {};
        default:
            return state;
    }
};

const agencyCustomersList = (state = initialState.agencyCustomersList, action) => {
    switch (action.type) {
        case c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS:
            return [ ...action.data ];
        case c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS:
            const newAgencyCustomersList = state.filter(item => !action.ids.includes(item.id));
            return [...newAgencyCustomersList];
        case c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_FAIL:
        case LOCATION_CHANGE:
            return [];
        default:
            return state;
    }
};

const adminPannelError = (state = initialState.error, action) => {
    switch (action.type) {
        case c.GET_AGENCIES_LIST_SUCCESS:
            return {};
        case c.GET_AGENCIES_LIST_FAIL:
            return { ...action.error };
        default:
            return state;
    }
};

const currentAgencyCustomer = (state = initialState.currentAgencyCustomer, action) => {
    switch (action.type) {
        case c.GET_CURRENT_AGENCY_CUSTOMER_SUCCESS:
            return { ...action.data };
        case c.GET_CURRENT_AGENCY_CUSTOMER_FAIL:
            return {};
        default:
            return state;
    }
};



export default combineReducers({
    ...loaderReducers,
    agenciesList,
    agencyUsersList,
    currentAgency,
    currentAgencyUser,
    agencyCustomersList,
    currentAgencyCustomer,
    error: adminPannelError,
});