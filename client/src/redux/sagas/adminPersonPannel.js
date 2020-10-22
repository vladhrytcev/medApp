import { all, take, fork, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as API from '../../api';
import { execRequest } from '../../services/util';
import { OrganisationsList } from '../../constants/fakeDataOrg';
import { AdminAllUsersList, AgenciesList } from '../../constants/fakeData';
import { genRandomId } from '../../helpers';
import * as c from '../constants/adminPersonPannel';



function* getAllAdminPersonUsers() {
    while (true) {
        const { role } = yield take(c.GET_PERSON_USERS_LIST_REQUEST);

        const newList = AdminAllUsersList.filter(item => item.role === role)
        yield put({
            type: c.GET_PERSON_USERS_LIST_SUCCESS,
            data: [...newList]
        });
    }
}

function* deletePersonUsers() {
    while (true) {
        const { ids } = yield take(c.DELETE_PERSON_USERS_REQUEST);

        yield put({
            type: c.DELETE_PERSON_USERS_SUCCESS,
            ids
        });
    }
}

function* inviteNewPersonUser() {
    while (true) {
        const { email } = yield take(c.INVITE_USER_REQUEST);

        yield put({
            type: c.INVITE_USER_SUCCESS,
            email
        });
    }
}

function* getUserById() {
    while (true) {
        const { id } = yield take(c.GET_CURRENT_PERSON_USER_REQUEST);
        const rowData = AdminAllUsersList.filter(item => item.id === id)[0];
        const agencies = !!rowData.agencyId ? AgenciesList.filter(item => rowData.agencyId.includes(item.id)) : [];
        const data = {...rowData, agencyId: [...agencies]};

        yield put({
            type: c.GET_CURRENT_PERSON_USER_SUCCESS,
            data
        });
    }
}

function* editCurrentUser() {
    while (true) {
        const { id, arr } = yield take(c.CHANGE_CURRENT_USER_REQUEST);

        yield put({
            type: c.CHANGE_CURRENT_USER_SUCCESS,
            id,
            arr
        });
    }
}



function* watch() {
    yield all([
        fork(getAllAdminPersonUsers),
        fork(deletePersonUsers),
        fork(inviteNewPersonUser),
        fork(getUserById),
        fork(editCurrentUser),
    ]);
}

export default watch;