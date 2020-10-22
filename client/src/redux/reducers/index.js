import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { connectRouter } from 'connected-react-router';

import themeReducer from './themeReducers';
import auth from './auth';
import local from './local';
import adminPannel from './adminPannel';
import adminOrgsPannel from './adminOrgsPannel';
import adminPersonPannel from './adminPersonPannel';
import organizationsJobs from './organizationsJobs';
import shared from './shared';
import homepage from './homepage';


export default function createReducer(history) {
    const mainReducers = combineReducers({
        router: connectRouter(history),
        themeReducer,
        shared,
        auth,
        local,
        adminPannel,
        adminOrgsPannel,
        adminPersonPannel,
        organizationsJobs,
        homepage
    });

    return reduceReducers(mainReducers);
}
