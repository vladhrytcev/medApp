import { all, take, fork, put, select} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as API from '../../api';
import { execRequest } from '../../services/util';
import * as c from '../constants/auth';



function* signUp() {
    while (true) {
        const { firstName, lastName, email, password } = yield take(c.SIGN_UP_REQUEST);

        yield fork(execRequest, {
            types: [c.SIGN_UP_SUCCESS, c.SIGN_UP_FAIL],
            api: API.authSignUp,
            payload: { firstName, lastName, email, password },
        });

        const data = yield take([c.SIGN_UP_SUCCESS, c.SIGN_UP_FAIL]);
        
        if(data.type === c.SIGN_UP_SUCCESS) {
            const store = yield select();
            const language = store.local.language;
            yield put(push(`/${language}/auth/sign-in`));
        }
    }
}


function* signIn() {
    while (true) {
        const { email, password } = yield take(c.LOG_IN_REQUEST);

        yield fork(execRequest, {
            types: [c.LOG_IN_SUCCESS, c.LOG_IN_FAIL],
            api: API.authLogIn,
            payload: { email, password },
        });

        // const data = yield take([c.LOG_IN_SUCCESS, c.LOG_IN_FAIL]);
        // if(data.type === c.LOG_IN_SUCCESS) {
        //     yield put(push('/'));
        // }
    }
}



function* watch() {
    yield all([
        fork(signUp),
        fork(signIn),
    ]);
}

export default watch;