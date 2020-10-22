import { combineReducers } from 'redux';

import * as c from '../constants/homepage';

const initialState = {
  specialities: {},
  formData: {}
};

const specialities = (state = initialState.specialities, action) => {
  switch (action.type) {
    case c.SPECIALIST_SEARCH_SUCCESS:
      return { ...action.data };
    case c.SPECIALIST_SEARCH_FAIL:
      return { ...state }
    default:
      return {};
  }
}

const emailData = (state = initialState.formData, action) => {
  switch (action.type) {
    case c.SEND_EMAIL_SUCCESS:
      return { ...action.data };
    case c.ORGANISATION_SEARCH_FAIL:
      return { ...state }
    default:
      return {};
  }
}

export default combineReducers({
  specialities,
  emailData,
});
