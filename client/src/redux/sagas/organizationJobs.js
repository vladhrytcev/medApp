import { all, take, fork, put, select } from 'redux-saga/effects';
import * as API from '../../api';
import { allJobsList } from '../../constants/fakeJobList';
import { push } from 'connected-react-router';
import { execRequest } from '../../services/util';
import * as c from '../constants/organizationJobs';


function* getAllOrganizationJobs() {
    while (true) {
        yield take(c.GET_ORGANISATION_JOB_LIST_REQUEST);

        yield fork(execRequest, {
            types: [c.GET_ORGANISATION_JOB_LIST_SUCCESS, c.GET_ORGANISATION_JOB_LIST_FAIL],
            api: API.jobGet,
        });
        // yield put({
        //     type: c.GET_EXTERNAL_JOB_LIST_SUCCESS,
        //     data: [...allJobsList]
        // });
    }
}

function* deleteOrganizationJob() {
    while (true) {
        const { id, onSuccessCb } = yield take(c.DELETE_ORGANISATION_JOB_REQUEST);
        yield fork(execRequest, {
            types: [c.DELETE_ORGANISATION_JOB_SUCCESS, c.DELETE_ORGANISATION_JOB_FAIL],
            api: API.jobDel,
            payload: { id, onSuccessCb },
        });
    }
}

function* saveOrganizationOrgJob() {
    while (true) {
        const { type, ...job } = yield take(c.POST_ORGANISATION_JOB_REQUEST);
        yield fork(execRequest, {
            types: [
                c.POST_ORGANISATION_JOB_SUCCESS, 
                c.POST_ORGANISATION_JOB_FAIL
            ],
            api: API.jobPost,
            payload: job,
        });

        const store = yield select();
        const language = store.local.language;
        yield put(push(`/${language}/organisations/dashboard`));
    }
}

function* updateOrganizationJob() {
    while (true) {
        const { type, ...job } = yield take(c.UPDATE_ORGANISATION_JOB_REQUEST);
        
        yield fork(execRequest, {
            types: [
                c.UPDATE_ORGANISATION_JOB_SUCCESS, 
                c.UPDATE_ORGANISATION_JOB_FAIL
            ],
            api: API.jobUpdate,
            payload: job,
        });
    }
}

function* watch() {
    yield all([
        fork(getAllOrganizationJobs),
        fork(deleteOrganizationJob),
        fork(saveOrganizationOrgJob),
        fork(updateOrganizationJob),
    ]);
}

export default watch;