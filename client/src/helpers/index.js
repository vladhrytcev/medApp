import trim from 'lodash/trim';
import * as CONSTANTS from '../constants/common'

export function prefixPath (path, prefix) {
  return `/${prefix}/${trim(path, '/')}`
}

export const genRandomId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

export const parseJwt = token => {

  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url && base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  }
};
  
export const getUserEmail = () => {
  const token = JSON.parse(window.localStorage.getItem(CONSTANTS.TOKEN_KEY));
  return parseJwt(token.local.userAccess.access_token).email;
};

export const getUserId = () => {
  const token = JSON.parse(window.localStorage.getItem(CONSTANTS.TOKEN_KEY));
  return parseJwt(token.local.userAccess.access_token).id;
};