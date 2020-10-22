import * as c from '../constants/adminPersonPannel';

export const getAllAdminPersonUsers = (role) => ({
    type: c.GET_PERSON_USERS_LIST_REQUEST,
    role
});

export const deletePersonUsers = (ids) => ({
    type: c.DELETE_PERSON_USERS_REQUEST,
    ids
});

export const inviteNewPersonUser = (email) => ({
    type: c.INVITE_USER_REQUEST,
    email
});

export const getUserById = (id) => ({
    type: c.GET_CURRENT_PERSON_USER_REQUEST,
    id
});

export const editCurrentUser = (id, arr) => ({
    type: c.CHANGE_CURRENT_USER_REQUEST,
    id,
    arr
});