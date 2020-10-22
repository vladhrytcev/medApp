import { all, take, fork, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as API from '../../api';
import { execRequest } from '../../services/util';
import { AgenciesList, AgencyUsersList, AdminAllUsersList } from '../../constants/fakeData';
import { genRandomId } from '../../helpers';
import * as c from '../constants/adminPannel';



function* getAllAdminAgencies() {
    while (true) {
        yield take(c.GET_AGENCIES_LIST_REQUEST);

        yield put({
            type: c.GET_AGENCIES_LIST_SUCCESS,
            data: AgenciesList
        });
    }
}

function* deleteAdminAgencies() {
    while (true) {
        const { ids } = yield take(c.DELETE_AGENCIES_REQUEST);

        yield put({
            type: c.DELETE_AGENCIES_SUCCESS,
            ids
        });
    }
}

function* getAgencyById() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_AGENCY_REQUEST);

        const data = AgenciesList.filter(item => item.id === id)[0];

        yield put({
            type: c.GET_CURRENT_AGENCY_SUCCESS,
            data
        });
    }
}

function* editAgencyById() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_AGENCY_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_AGENCY_SUCCESS,
            id,
            arr
        });
    }
}

function* addNewAgency() {
    while (true) {
        const { agencyName, postcode, address, country, url, logo } = yield take(c.ADD_NEW_AGENCY_REQUEST);

        const id = genRandomId();

        yield put({
            type: c.ADD_NEW_AGENCY_SUCCESS,
            id,
            agencyName,
            postcode,
            address,
            country,
            url,
            logo
        });

        const store = yield select();
        const language = store.local.language;

        yield put(push(`/${language}/admin/agencies`));
    }
}

function* getAgencyUsersById() {
    while (true) {
        const { id } = yield take(c.GET_USERS_FOR_CURRENT_AGENCY_REQUEST);

        const data = AgencyUsersList.reduce((acc, item) => {
            if(item.agencyId.includes(id)) {
                acc.push(item);
            }

            return acc;
        }, []);

        yield put({
            type: c.GET_USERS_FOR_CURRENT_AGENCY_SUCCESS,
            data
        });
    }
}


function* deleteAdminAgencyUsers() {
    while (true) {
        const { ids } = yield take(c.DELETE_USERS_FOR_CURRENT_AGENCY_REQUEST);

        yield put({
            type: c.DELETE_USERS_FOR_CURRENT_AGENCY_SUCCESS,
            ids
        });
    }
}

function* getCurrentAgencyUser() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_AGENCY_USER_REQUEST);

        const data = AgencyUsersList.filter(item => item.id === id)[0];

        yield put({
            type: c.GET_CURRENT_AGENCY_USER_SUCCESS,
            data
        });
    }
}

function* editCurrentAgencyUser() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_AGENCY_USER_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_AGENCY_USER_SUCCESS,
            id,
            arr
        });
    }
}

function* inviteNewAdminAgencyUser() {
    while (true) {
        const { email } = yield take(c.INVITE_AGENCY_USER_REQUEST);

        yield put({
            type: c.INVITE_AGENCY_USER_SUCCESS,
            email
        });
    }
}

function* getAgencyCustomersById() {
    while (true) {
        const { id } = yield take(c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST);

        const data = AdminAllUsersList.filter(item => item.agencyId && item.agencyId.includes(id));

        yield put({
            type: c.GET_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS,
            data
        });
    }
}

function* deleteAdminAgencyCustomer() {
    while (true) {
        const { ids } = yield take(c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_REQUEST);

        yield put({
            type: c.DELETE_CUSTOMERS_FOR_CURRENT_AGENCY_SUCCESS,
            ids
        });
    }
}

function* inviteNewAdminAgencyCustomer() {
    while (true) {
        const { email } = yield take(c.INVITE_AGENCY_CUSTOMER_REQUEST);

        yield put({
            type: c.INVITE_AGENCY_CUSTOMER_SUCCESS,
            email
        });
    }
}

function* getCurrentAgencyCustomer() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_AGENCY_CUSTOMER_REQUEST);

        const data = AdminAllUsersList.filter(item => item.id === id)[0];

        yield put({
            type: c.GET_CURRENT_AGENCY_CUSTOMER_SUCCESS,
            data
        });
    }
}


function* watch() {
    yield all([
        fork(getAllAdminAgencies),
        fork(deleteAdminAgencies),
        fork(getAgencyById),
        fork(editAgencyById),
        fork(addNewAgency),
        fork(getAgencyUsersById),
        fork(deleteAdminAgencyUsers),
        fork(getCurrentAgencyUser),
        fork(editCurrentAgencyUser),
        fork(inviteNewAdminAgencyUser),
        fork(getAgencyCustomersById),
        fork(deleteAdminAgencyCustomer),
        fork(inviteNewAdminAgencyCustomer),
        fork(getCurrentAgencyCustomer)
    ]);
}

export default watch;