import * as c from '../constants/local';

export const changeLanguage = (lng) => ({
    type: c.CHANGE_LANGUAGE,
    lng
});