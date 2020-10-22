import { take, fork, all } from 'redux-saga/effects';
import * as API from '../../api';
import * as c from '../constants/homepage';
import { execRequest } from '../../services/util';

function* getSpecialistSearchList() {
  while (true) {
    yield take(c.SPECIALIST_SEARCH_REQUEST);

    yield fork(execRequest, {
      types: [c.SPECIALIST_SEARCH_SUCCESS, c.SPECIALIST_SEARCH_FAIL],
      api: API.specialistSearchListGet
    });
  }
};

function* sendEmailData() {
  while (true) {
    const { date, hospitalName, name, email, phone } = yield take(c.SEND_EMAIL_REQUEST);

    yield fork(execRequest, {
      types: [c.SEND_EMAIL_SUCCESS, c.SEND_EMAIL_FAIL],
      api: API.sendFormPost,
      payload: { date, hospitalName, name, email, phone }
    })
  }
}

function* watch() {
  yield all([
    fork(getSpecialistSearchList),
    fork(sendEmailData),
  ]);
}

export default watch;
