import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from "connected-react-router";
import { createLoaderReducers } from './utils';

import * as c from '../constants/organizationJobs';

const initialState = {
    externeAnfagen: [],
    confirmation: [],
    offeneShifts: [],
    error: {},
};

const loaderReducers = createLoaderReducers({
    requestActions: [
        c.GET_ORGANISATION_JOB_LIST_REQUEST,
    ],
    successActions: [
        c.GET_ORGANISATION_JOB_LIST_SUCCESS,
    ],
    failActions: [
        c.GET_ORGANISATION_JOB_LIST_FAIL,
    ],
});

const organizationJobsList = (state = initialState, action) => {
    switch (action.type) {
        case c.GET_ORGANISATION_JOB_LIST_SUCCESS:
            let externeAnfagenArr = [], confirmationArr = [], offeneShifts = [], applicant = [];
    
            action.data.forEach(job => {
              if (!job.applicants.length) {
                offeneShifts.push({
                  ...job,
                  open: false,
                  checked: false,
                  salary: job.salary.map(el => {
                    return {...el, checked: false}
                  })
                });
              } 
              else if (job.applicants.every(aplicant => aplicant.state === 'applied')) {
                confirmationArr.push({
                  ...job, 
                  open: false, 
                  checked: false,
                  applicants: job.applicants.map(el => {
                    return {...el, checked: false}
                  })
                });
              } 
              else if (job.applicants.some(aplicant => aplicant.state === 'selected')) {
                applicant = job.applicants.filter(aplicant => aplicant.state === 'selected');
        
                externeAnfagenArr.push({ 
                  ...job, 
                  applicants: applicant, 
                  open: false, 
                  checked: false,
                  dates: job.dates.map(el => {
                    return {...el, checked: false}
                  })
                })
              }
            })
            return {
                ...state,
                externeAnfagen: externeAnfagenArr,
                confirmation: confirmationArr,
                offeneShifts: offeneShifts,
            };
        case c.GET_ORGANISATION_JOB_LIST_FAIL:
            return initialState;
        default:
            return state;
    }
};

export default combineReducers({
    ...loaderReducers,
    organizationJobsList,
});