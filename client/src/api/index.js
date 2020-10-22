import api from '../services/api';
import * as ENDPOINTS from '../constants/endpoints';


////// auth ////////
export const authSignUp = ({ firstName, lastName, email, password, role = 'ADMIN' }) => api.post(ENDPOINTS.SIGNUP, { firstName, lastName, email, password, role });
export const authLogIn = ({ email, password, role = "USER" }) => api.post(ENDPOINTS.SIGNIN, { email, password, role });

////// Job ////////
export const jobGet = () => api.get(ENDPOINTS.JOB);
export const jobPost = (job) => api.post(ENDPOINTS.JOB, job);
export const jobDel = ({ id }) => api.delete(ENDPOINTS.JOB, { ids: [id] });
export const jobUpdate = (job) => api.put(`${ENDPOINTS.JOB}/${job.id}`, job);

////// Orgs ///////
export const orgPost = (org) => api.post(ENDPOINTS.ORGANIZATIONS, org);
export const orgsGet = () => api.get(ENDPOINTS.ORGANIZATIONS);
export const orgGetById = (id) => api.get(`${ENDPOINTS.ORGANIZATIONS}/${id}`);


////// Home Page //////
export const specialistSearchListGet = () => api.get(ENDPOINTS.SEARCH_SPECIALITY);

////// Send Form //////
export const sendFormPost = data => api.post(ENDPOINTS.SEND_FORM, data);
