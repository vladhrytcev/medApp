import * as c from '../constants/organizationJobs';

export const getAllOrganizationJobs = (id) => ({
  type: c.GET_ORGANISATION_JOB_LIST_REQUEST,
  id: id
});

export const deleteOrganizationJob = (props) => ({
  type: c.DELETE_ORGANISATION_JOB_REQUEST,
  id: props.id,
  onSuccessCb: props.onSuccessCb
});

export const saveOrgJob = (props) => ({
  type: c.POST_ORGANISATION_JOB_REQUEST,
  ...props
});

export const updateOrgJob = (props) => ({
  type: c.UPDATE_ORGANISATION_JOB_REQUEST,
  ...props
});
