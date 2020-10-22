import { all, fork } from 'redux-saga/effects';
import watchAuth from './auth';
import watchAdminPannel from './adminPannel';
import watchAdminOrgsPannel from './adminOrgsPannel';
import watchAdminPersonPannel from './adminPersonPannel';
import watchOrganizationsJobs from './organizationJobs';
import watchHomepage from './homepage';


export default function* root() {
    yield all([
        fork(watchAuth),
        fork(watchAdminPannel),
        fork(watchAdminOrgsPannel),
        fork(watchAdminPersonPannel),
        fork(watchOrganizationsJobs),
        fork(watchHomepage)
    ]);
}