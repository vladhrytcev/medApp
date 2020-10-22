import * as c from '../constants/adminPannel';

export const getAllAdminAgencies = () => ({
    type: c.GET_AGENCIES_LIST_REQUEST,
});

export const deleteAdminAgencies = (ids) => ({
    type: c.DELETE_AGENCIES_REQUEST,
    ids
});

export const getAgencyById = (id) => ({
    type: c.GET_CURRENT_AGENCY_REQUEST,
    id
});

export const editAgencyById = (id, arr) => ({
    type: c.CHANGE_CURRENT_AGENCY_REQUEST,
    id,
    arr
});

export const addNewAgency = (agencyName, postcode, address, country, url, logo) => ({
    type: c.ADD_NEW_AGENCY_REQUEST,
    agencyName,
    postcode,
    address,
    country,
    url,
    logo
});

export const getAgencyUsersById = (id) => ({
    type: c.GET_USERS_FOR_CURRENT_AGENCY_REQUEST,
    id
});

export const deleteAdminAgencyUsers = (ids) => ({
    type: c.DELETE_USERS_FOR_CURRENT_AGENCY_REQUEST,
    ids
});

export const addNewAgencyUser = () => ({
    
});

export const getCurrentAgencyUser = (id) => ({
    type: c.GET_CURRENT_AGENCY_USER_REQUEST,
    id
});

export const editCurrentAgencyUser = (id, arr) => ({
    type: c.CHANGE_CURRENT_AGENCY_USER_REQUEST,
    id,
    arr
});

export const inviteNewAdminAgencyUser = (email) => ({
    type: c.INVITE_AGENCY_USER_REQUEST,
    email
});

export const getAgencyCustomersById = (id) => ({
    type: c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST,
    id 
});

export const deleteAdminAgencyCustomer = (ids) => ({
    type: c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST,
    ids
});

export const inviteNewAdminAgencyCustomer = (email) => ({
    type: c.INVITE_AGENCY_CUSTOMER_REQUEST,
    email
});

export const getCurrentAgencyCustomer = (id) => ({
    type: c.GET_CURRENT_AGENCY_CUSTOMER_REQUEST,
    id
});
