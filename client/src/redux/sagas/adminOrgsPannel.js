import { all, take, fork, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as API from '../../api';
import { execRequest } from '../../services/util';
import { OrganisationsList } from '../../constants/fakeDataOrg';
import { AdminAllUsersList } from '../../constants/fakeData';
import { genRandomId } from '../../helpers';
import * as c from '../constants/adminOrgsPannel';



function* getAllAdminOrganisations() {
    while (true) {
        yield take(c.GET_ORGANISATIONS_LIST_REQUEST);

        yield fork(execRequest, {
            types: [
                c.GET_ORGANISATIONS_LIST_SUCCESS,
                c.GET_ORGANISATIONS_LIST_FAIL
            ],
            api: API.orgsGet,
        })
    }
}

function* deleteAdminOrganisations() {
    while (true) {
        const { ids } = yield take(c.DELETE_ORGANISATIONS_REQUEST);

        yield put({
            type: c.DELETE_ORGANISATIONS_SUCCESS,
            ids
        });
    }
}

function* getOrganisationById() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_ORGANISATION_REQUEST);

        yield fork(execRequest, {
            types: [
                c.GET_CURRENT_ORGANISATION_SUCCESS,
                c.GET_CURRENT_ORGANISATION_FAIL,
            ],
            api: API.orgGetById,
            payload: id
        })
    }
}

function* addNewOrganisation() {
    while (true) {
        const {type, ...org} = yield take(c.ADD_NEW_ORGANISATION_REQUEST);

        yield fork(execRequest, {
            types: [c.ADD_NEW_ORGANISATION_SUCCESS, c.ADD_NEW_ORGANISATION_FAIL],
            api: API.orgPost,
            payload: org,
        });

        const store = yield select();
        const language = store.local.language;
        yield put(push(`/${language}/admin/organisation`));
    }
}

function* editOrganisationPicById() {
    while (true) {
        const { id, picId, arr } = yield take(c.CHANGE_CURRENT_ORGANISATION_PIC_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_ORGANISATION_PIC_SUCCESS,
            id,
            picId,
            arr
        });
    }
}

function* editOrganisationById() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_ORGANISATION_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_ORGANISATION_SUCCESS,
            id,
            arr
        });
    }
}

function* deleteAdminOrganisationUsers() {
    while (true) {
        const { ids } = yield take(c.DELETE_USERS_FOR_CURRENT_ORGANISATION_REQUEST);

        yield put({
            type: c.DELETE_USERS_FOR_CURRENT_ORGANISATION_SUCCESS,
            ids
        });
    }
}

function* editCurrentOrganisationUser() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_ORGANISATION_USER_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_ORGANISATION_USER_SUCCESS,
            id,
            arr
        });
    }
}

function* deleteAdminOrganisationDepartment() {
    while (true) {
        const { ids } = yield take(c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_REQUEST);

        yield put({
            type: c.DELETE_DEPARTMENT_FOR_CURRENT_ORGANISATION_SUCCESS,
            ids
        });
    }
}

function* addNewDepartment() {
    while (true) {
        const { departmentName, skills } = yield take(c.ADD_NEW_DEPARTMENT_REQUEST);

        const id = genRandomId();

        yield put({
            type: c.ADD_NEW_DEPARTMENT_SUCCESS,
            id,
            departmentName,
            skills
        });

        const store = yield select();
        const language = store.local.language;
        const org = store.adminOrgsPannel.currentOrganisation

        yield put(push(`/${language}/admin/organisation/${org.id}`));
    }
}

function* editDepartmentById() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_DEPARTMENT_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_DEPARTMENT_SUCCESS,
            id,
            arr
        });
    }
}

function* getDepartmentById() {
    while (true) {
        const { orgId, depId } = yield take(c.GET_CURRENT_DEPARTMENT_REQUEST);

        const data = [...OrganisationsList].filter(item => item.id === orgId)[0];
        const newData = {...data, departments: [...data.departments]};

        const newDepartments = newData.departments.filter(item => item.id === depId)[0];
        
        const rowData = {...newDepartments, depAdmins: [...newDepartments.depAdmins], depUsers: [...newDepartments.depUsers]};

        const newAdmins = AdminAllUsersList.filter(el => newDepartments.depAdmins.includes(el.id));
        rowData.depAdmins=[...newAdmins];

        const newUsers = AdminAllUsersList.filter(el => newDepartments.depUsers.includes(el.id));
        rowData.depUsers=[...newUsers];

        const newObj = {...rowData};

        yield put({
            type: c.GET_CURRENT_DEPARTMENT_SUCCESS,
            data: newObj
        });
    }
}

function* deleteAdminDepartmentUsers() {
    while (true) {
        const { ids } = yield take(c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_REQUEST);

        yield put({
            type: c.DELETE_DEPARTMENT_USERS_FOR_CURRENT_ORGANISATION_SUCCESS,
            ids
        });
    }
}

function* inviteNewAdminDepartmentUser() {
    while (true) {
        const { email } = yield take(c.INVITE_DEPARTMENT_USER_REQUEST);

        yield put({
            type: c.INVITE_DEPARTMENT_USER_SUCCESS,
            email
        });
    }
}

function* getCurrentDepartmentUser() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_DEPARTMENT_USER_REQUEST);

        const data = AdminAllUsersList.filter(item => item.id === id)[0];

        yield put({
            type: c.GET_CURRENT_DEPARTMENT_USER_SUCCESS,
            data
        });
    }
}

function* editCurrentDepartmentUser() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_DEPARTMENT_USER_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_DEPARTMENT_USER_SUCCESS,
            id,
            arr
        });
    }
}

function* deleteAdminDepartmentCustomers() {
    while (true) {
        const { ids } = yield take(c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_REQUEST);

        yield put({
            type: c.DELETE_DEPARTMENT_CUSTOMER_FOR_CURRENT_ORGANISATION_SUCCESS,
            ids
        });
    }
}

function* inviteNewAdminDepartmentCustomer() {
    while (true) {
        const { email } = yield take(c.INVITE_DEPARTMENT_CUSTOMER_REQUEST);

        yield put({
            type: c.INVITE_DEPARTMENT_CUSTOMER_SUCCESS,
            email
        });
    }
}

function* getCurrentDepartmentCustomer() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_DEPARTMENT_CUSTOMER_REQUEST);

        const data = AdminAllUsersList.filter(item => item.id === id)[0];

        yield put({
            type: c.GET_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS,
            data
        });
    }
}

function* editCurrentDepartmentCustomer() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_DEPARTMENT_CUSTOMER_SUCCESS,
            id,
            arr
        });
    }
}



function* watch() {
    yield all([
        fork(getAllAdminOrganisations),
        fork(deleteAdminOrganisations),
        fork(getOrganisationById),
        fork(addNewOrganisation),
        fork(editOrganisationPicById),
        fork(editOrganisationById),
        fork(deleteAdminOrganisationUsers),
        fork(editCurrentOrganisationUser),
        fork(deleteAdminOrganisationDepartment),
        fork(addNewDepartment),
        fork(editDepartmentById),
        fork(getDepartmentById),
        fork(deleteAdminDepartmentUsers),
        fork(inviteNewAdminDepartmentUser),
        fork(getCurrentDepartmentUser),
        fork(editCurrentDepartmentUser),
        fork(deleteAdminDepartmentCustomers),
        fork(inviteNewAdminDepartmentCustomer),
        fork(getCurrentDepartmentCustomer),
        fork(editCurrentDepartmentCustomer)
    ]);
}

export default watch;