import { combineReducers } from 'redux';

import * as c from '../constants/shared';

const initialState = {
  deletingIsOpened: false,
  onDeletingSubmit: () => {},
  onDeletingCancel: () => {},
  deletingFormData: {},
  deletingNameKey: "",
};

const deletingDialog = (state = initialState, action) => {
    switch (action.type) {
        case c.OPEN_DELETING_DIALOG:
          return {
            ...state,
            deletingIsOpened: true,
            onDeletingSubmit: action.onDeletingSubmit,
            onDeletingCancel: action.onDeletingCancel || (() => {}),
            deletingFormData: action.deletingFormData,
            deletingNameKey: action.deletingNameKey,
          };
        case c.CLOSE_DELETING_DIALOG:
          return {
            ...state,
            deletingIsOpened: false,
            onDeletingSubmit: action.onDeletingSubmit,
            onDeletingCancel: action.onDeletingCancel || (() => {}),
            deletingFormData: action.deletingFormData,
            deletingNameKey: action.deletingNameKey,
          };

        default:
            return state;
    }
};

export default combineReducers({
  deletingDialog,
});