import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from "connected-react-router";
import { createLoaderReducers } from './utils';

import * as c from '../constants/adminOrgsPannel';

const initialState = {
    organisationsList: [],
    currentOrganisation: {},
    currentDepartment: {},
    currentDepartmentUser: {},
    currentDepartmentCustomer: {},
    error: {},
};

const loaderReducers = createLoaderReducers({
    requestActions: [
        c.GET_ORGANISATIONS_LIST_REQUEST,
        c.DELETE_ORGANISATIONS_REQUEST,
        c.GET_CURRENT_ORGANISATION_REQUEST,
        c.ADD_NEW_ORGANISATION_REQUEST,
        c.CHANGE_CURRENT_ORGANISATION_PIC_REQUEST,
        c.CHANGE_CURRENT_ORGANISATION_REQUEST,
        c.DELETE_USERS_FOR_CURRENT_ORGANISATION_REQUEST,
        c.CHANGE_CURRENT_ORGANISATION_USER_REQUEST,
        c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_REQUEST,
        c.ADD_NEW_DEPARTMENT_REQUEST,
        c.CHANGE_CURRENT_DEPARTMENT_REQUEST,
        c.GET_CURRENT_DEPARTMENT_REQUEST,
        c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_REQUEST,
        c.INVITE_DEPARTMENT_USER_REQUEST,
        c.GET_CURRENT_DEPARTMENT_USER_REQUEST,
        c.CHANGE_CURRENT_DEPARTMENT_USER_REQUEST,
        c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_REQUEST,
        c.INVITE_DEPARTMENT_CUSTOMER_REQUEST,
        c.GET_CURRENT_DEPARTMENT_CUSTOMER_REQUEST,
        c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_REQUEST,
    ],
    successActions: [
        c.GET_ORGANISATIONS_LIST_SUCCESS,
        c.DELETE_ORGANISATIONS_SUCCESS,
        c.GET_CURRENT_ORGANISATION_SUCCESS,
        c.ADD_NEW_ORGANISATION_SUCCESS,
        c.CHANGE_CURRENT_ORGANISATION_PIC_SUCCESS,
        c.CHANGE_CURRENT_ORGANISATION_SUCCESS,
        c.DELETE_USERS_FOR_CURRENT_ORGANISATION_SUCCESS,
        c.CHANGE_CURRENT_ORGANISATION_USER_SUCCESS,
        c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_SUCCESS,
        c.ADD_NEW_DEPARTMENT_SUCCESS,
        c.CHANGE_CURRENT_DEPARTMENT_SUCCESS,
        c.GET_CURRENT_DEPARTMENT_SUCCESS,
        c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_SUCCESS,
        c.INVITE_DEPARTMENT_USER_SUCCESS,
        c.GET_CURRENT_DEPARTMENT_USER_SUCCESS,
        c.CHANGE_CURRENT_DEPARTMENT_USER_SUCCESS,
        c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_SUCCESS,
        c.INVITE_DEPARTMENT_CUSTOMER_SUCCESS,
        c.GET_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS,
        c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS,
    ],
    failActions: [
        c.GET_ORGANISATIONS_LIST_FAIL,
        c.DELETE_ORGANISATIONS_FAIL,
        c.GET_CURRENT_ORGANISATION_FAIL,
        c.ADD_NEW_ORGANISATION_FAIL,
        c.CHANGE_CURRENT_ORGANISATION_PIC_FAIL,
        c.CHANGE_CURRENT_ORGANISATION_FAIL,
        c.DELETE_USERS_FOR_CURRENT_ORGANISATION_FAIL,
        c.CHANGE_CURRENT_ORGANISATION_USER_FAIL,
        c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_FAIL,
        c.ADD_NEW_DEPARTMENT_FAIL,
        c.CHANGE_CURRENT_DEPARTMENT_FAIL,
        c.GET_CURRENT_DEPARTMENT_FAIL,
        c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_FAIL,
        c.INVITE_DEPARTMENT_USER_FAIL,
        c.GET_CURRENT_DEPARTMENT_USER_FAIL,
        c.CHANGE_CURRENT_DEPARTMENT_USER_FAIL,
        c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_FAIL,
        c.INVITE_DEPARTMENT_CUSTOMER_FAIL,
        c.GET_CURRENT_DEPARTMENT_CUSTOMER_FAIL,
        c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_FAIL,
    ],
});

const organisationsList = (state = initialState.organisationsList, action) => {
    switch (action.type) {
        case c.GET_ORGANISATIONS_LIST_SUCCESS:
            return [ ...action.data ];
        case c.DELETE_ORGANISATIONS_SUCCESS:
            const newOrganisationsList = state.filter(item => !action.ids.includes(item.id));
            return [...newOrganisationsList];
        case c.ADD_NEW_ORGANISATION_SUCCESS:
            const newObj = {};
            newObj.id = action.id;
            newObj.name = action.agencyName;
            newObj.postcode = action.postcode;
            newObj.country = action.country;
            newObj.city = action.city;
            newObj.address = action.address;
            newObj.url = action.url;
            newObj.logo = action.logo;
            newObj.pics = action.pics;

            const newState = [...state, newObj];
            return [...newState];
        case c.GET_ORGANISATIONS_LIST_FAIL:
            return [];
        default:
            return state;
    }
};

const currentOrganisation = (state = initialState.currentOrganisation, action) => {
    switch (action.type) {
        case c.GET_CURRENT_ORGANISATION_SUCCESS:
            return { ...action.data };
        case c.GET_CURRENT_ORGANISATION_FAIL:
            return {};
        case c.CHANGE_CURRENT_ORGANISATION_PIC_SUCCESS:
            const newData = {...state};
            const pics = [...newData.pics];
            const newPics = pics.reduce((arr, item) => {
                if(item.id === action.picId) {
                    action.arr.forEach(el => {
                        item[el.field] = el.value;
                    })
                }
                return arr;
            }, []);
            return {...newData};
        case c.CHANGE_CURRENT_ORGANISATION_SUCCESS:
            const newObject = {...state};
            action.arr.forEach(item => {
                newObject[item.field] = item.value;
            });
            return {...newObject};

        case c.DELETE_USERS_FOR_CURRENT_ORGANISATION_SUCCESS:
            const rowObject = {...state};
            const newContacts = rowObject.contacts.filter(item => !action.ids.includes(item.id));
            rowObject.contacts = [...newContacts];
            return {...rowObject};
        case c.CHANGE_CURRENT_ORGANISATION_USER_SUCCESS:
            const newState = {...state};
            const newContact = newState.contacts.reduce((arr, item) => {
                if(item.id === action.id) {
                    action.arr.forEach(el => {
                        item[el.field] = el.value;
                    })
                }
                arr.push(item);
                return arr;
            }, []);
            newState.contacts = [...newContact];
            return {...newState}
        case c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_SUCCESS:
            const rowObj = {...state};
            const newDepartments = rowObj.departments.filter(item => !action.ids.includes(item.id));
            rowObj.departments = [...newDepartments];
            return {...rowObj}
        default:
            return state;
    }
};

const currentDepartment = (state = initialState.currentDepartment, action) => {
    switch (action.type) {
        case c.GET_CURRENT_DEPARTMENT_SUCCESS:
            return { ...action.data };
        case c.CHANGE_CURRENT_DEPARTMENT_SUCCESS:
            const data = {...state};
            action.arr.forEach(el => {
                data[el.field] = el.value;
            })

            return {...data}
        case c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_SUCCESS:
            const rowDep = {...state};
            const newAdmins = rowDep.depAdmins.filter(item => !action.ids.includes(item.id));
            rowDep.depAdmins = [...newAdmins];
            return {...rowDep};
        case c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_SUCCESS:
            const rowDeps = {...state};
            const newUsers = rowDeps.depUsers.filter(item => !action.ids.includes(item.id));
            rowDeps.depUsers = [...newUsers];
            return {...rowDeps};
        case c.GET_CURRENT_DEPARTMENT_FAIL:
            return {};
        default:
            return state;
    }
};

const currentDepartmentUser = (state = initialState.currentDepartmentUser, action) => {
    switch (action.type) {
        case c.GET_CURRENT_DEPARTMENT_USER_SUCCESS:
            return { ...action.data };
        case c.CHANGE_CURRENT_DEPARTMENT_USER_SUCCESS:
            const newDepartmentUser = {...state};
            action.arr.forEach(item => {
                newDepartmentUser[item.field] = item.value;
            });
            return {...newDepartmentUser};
        case c.GET_CURRENT_DEPARTMENT_USER_FAIL:
            return {};
        default:
            return state;
    }
};

const currentDepartmentCustomer = (state = initialState.currentDepartmentCustomer, action) => {
    switch (action.type) {
        case c.GET_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS:
            return { ...action.data };
        case c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS:
            const newDepartmentCustomer = {...state};
            action.arr.forEach(item => {
                newDepartmentCustomer[item.field] = item.value;
            });
            return {...newDepartmentCustomer};
        case c.GET_CURRENT_DEPARTMENT_CUSTOMER_FAIL:
            return {};
        default:
            return state;
    }
};

const adminPannelError = (state = initialState.error, action) => {
    switch (action.type) {
        case c.GET_ORGANISATIONS_LIST_SUCCESS:
            return {};
        case c.GET_ORGANISATIONS_LIST_FAIL:
            return { ...action.error };
        default:
            return state;
    }
};



export default combineReducers({
    ...loaderReducers,
    organisationsList,
    currentOrganisation,
    currentDepartment,
    currentDepartmentUser,
    currentDepartmentCustomer,
    error: adminPannelError,
});