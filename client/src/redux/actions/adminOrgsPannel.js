import * as c from '../constants/adminOrgsPannel';

export const getAllAdminOrganisations = () => ({
    type: c.GET_ORGANISATIONS_LIST_REQUEST,
});

export const deleteAdminOrganisations = (ids) => ({
    type: c.DELETE_ORGANISATIONS_REQUEST,
    ids
});

export const getOrganisationById = (id) => ({
    type: c.GET_CURRENT_ORGANISATION_REQUEST,
    id
});

export const addNewOrganisation = props => ({
    type: c.ADD_NEW_ORGANISATION_REQUEST,
    ...props
});

export const editOrganisationPicById = (id, picId, arr) => ({
    type: c.CHANGE_CURRENT_ORGANISATION_PIC_REQUEST,
    id,
    picId,
    arr
});

export const editOrganisationById = (id, arr) => ({
    type: c.CHANGE_CURRENT_ORGANISATION_REQUEST,
    id,
    arr
});

export const deleteAdminOrganisationUsers = (ids) => ({
    type: c.DELETE_USERS_FOR_CURRENT_ORGANISATION_REQUEST,
    ids
});

export const editCurrentOrganisationUser = (id, arr) => ({
    type: c.CHANGE_CURRENT_ORGANISATION_USER_REQUEST,
    id,
    arr
});

export const deleteAdminOrganisationDepartment = (ids) => ({
    type: c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_REQUEST,
    ids
});

export const addNewDepartment = (
    departmentName,
    skills
) => ({
    type: c.ADD_NEW_DEPARTMENT_REQUEST,
    departmentName,
    skills
});

export const editDepartmentById = (id, arr) => ({
    type: c.CHANGE_CURRENT_DEPARTMENT_REQUEST,
    id,
    arr
});

export const getDepartmentById = (orgId, depId) => ({
    type: c.GET_CURRENT_DEPARTMENT_REQUEST,
    orgId,
    depId
});

export const deleteAdminDepartmentUsers = (ids) => ({
    type: c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_REQUEST,
    ids
});

export const inviteNewAdminDepartmentUser = (email) => ({
    type: c.INVITE_DEPARTMENT_USER_REQUEST,
    email
});

export const getCurrentDepartmentUser = (id) => ({
    type: c.GET_CURRENT_DEPARTMENT_USER_REQUEST,
    id
});

export const editCurrentDepartmentUser = (id, arr) => ({
    type: c.CHANGE_CURRENT_DEPARTMENT_USER_REQUEST,
    id,
    arr
});

export const deleteAdminDepartmentCustomers = (ids) => ({
    type: c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_REQUEST,
    ids
});

export const inviteNewAdminDepartmentCustomer = (email) => ({
    type: c.INVITE_DEPARTMENT_CUSTOMER_REQUEST,
    email
});

export const getCurrentDepartmentCustomer = (id) => ({
    type: c.GET_CURRENT_DEPARTMENT_CUSTOMER_REQUEST,
    id
});

export const editCurrentDepartmentCustomer = (id, arr) => ({
    type: c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_REQUEST,
    id,
    arr
});