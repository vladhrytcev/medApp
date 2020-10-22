import React, { useEffect, useState, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  useStyles,
  StyledCheckbox,
  StyledTableCell, 
  StyledTableRow,
  StyledTypography
} from '../OrgsDashboard/styledComponents';

import moment from 'moment';
import MenuComponent from "../../../components/MenuComponent";
import { stableSort, getSorting, useSorting } from '../OrgsDashboard/helpers';
import { 
  getAllOrganizationJobs,
  deleteOrganizationJob
} from '../../../redux/actions/organizationJobs';
import { openDeletingDialog } from '../../../redux/actions/shared';

function Conformation({
  organizationJobs: {
    isLoaded = false,
    isLoading = false,
    error,
    organizationJobsList
  },
  openDeletingDialog,
  deleteOrganizationJob,
  getAllOrganizationJobs
}){

  const { t, i18n } = useTranslation();

  const [confirmation, setConfirmation] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const {order, orderBy, createSortHandler} = useSorting();
  const classes = useStyles({color: 'green400'});
  
  useEffect(() => {
    if (isLoaded || error){
      setConfirmation(organizationJobsList.confirmation);
    }
  }, [organizationJobsList])

  const handleJobStatusChange = (param, id, stateFunction) => {
    stateFunction(state => {
      const jobIdx = state.findIndex(el => el._id === id);
      state[jobIdx][param] = !state[jobIdx][param];
      return [
        ...state.slice(0, jobIdx),
        state[jobIdx],
        ...state.slice(jobIdx + 1)
      ];
    })
  }

  const handleApplicantStatusChange = (jobId, applicantId) => {
    setConfirmation(state => {
      const jobIdx = state.findIndex(el => el._id === jobId);
      const applicantIdx = state[jobIdx].applicants.findIndex(el => el._id === applicantId)
      state[jobIdx].applicants[applicantIdx].checked = !state[jobIdx].applicants[applicantIdx].checked;
      return [
        ...state.slice(0, jobIdx),
        state[jobIdx],
        ...state.slice(jobIdx + 1)
      ];
    })
  }

  const handleChangeDetails = event => {
    event.persist();
    setShowDetails(event.target.checked);
    setConfirmation(state => {
      return state.map(e => {
        e.open = event.target.checked;
        return e;
      });
    })
  };

  const handleDelete = row => {
    openDeletingDialog({
      onDeletingSubmit: () => deleteOrganizationJob({
        id: row._id,
        onSuccessCb: () => getAllOrganizationJobs()
      }),
      deletingFormData: row,
      deletingNameKey: "title",
    });
  };
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Grid  className={classes.formWrapper} item xs={12} container justify="flex-start" alignItems="center">  
      <StyledTypography variant="h4" gutterBottom display="inline">
        Bestatigung
      </StyledTypography>    

      <Table aria-label="customized table"> 
        <TableHead className={classes.headColor}>
          <StyledTableRow>
            <StyledTableCell>
              <TableSortLabel
                active={orderBy === 'title'}
                direction={orderBy === 'title' ? order : "asc"}
                onClick={createSortHandler('title')}
              >
                <span className={classes.paddingTop}>FILLED</span>
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell>STANDORT</StyledTableCell>
            <StyledTableCell>
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : "asc"}
                onClick={createSortHandler('date')}
              >
                <span className={classes.paddingTop}>ZEITRAUM</span>
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell>BEWERBUNGEN</StyledTableCell>
            <StyledTableCell>
              <MoreHorizIcon />
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!!confirmation && 
          stableSort(confirmation, getSorting(order, orderBy)).map(job => (
            <Fragment key={job._id}>
              <StyledTableRow>
                <StyledTableCell>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center" 
                  >
                    <Grid lg={2} md={4} item>
                      <StyledCheckbox
                        colors="green400"
                        checked={job.checked}
                        onChange={() => handleJobStatusChange('checked', job._id, setConfirmation)}
                      />
                    </Grid>
                    <Grid lg={10} md={8} className={classes.highlighted} item>
                      {job.organisation && job.organisation.name || "Org name(miss data)"}
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>
                  {job.orig_dept && job.orig_dept.name || "Depatment name (miss data)"}
                </StyledTableCell>
                <StyledTableCell>
                  {job.dates[0] && moment(+job.dates[0].date.startDate).format('DD/MM/YYYY')}
                  {job.dates.length > 1 && <span>&ensp;-&ensp;</span>}
                  {job.dates.length > 1 && job.dates[job.dates.length - 1] &&  moment(+job.dates[job.dates.length - 1].date.endDate).format('DD/MM/YYYY')}
                </StyledTableCell>
                <StyledTableCell
                  className={classes.pointer}
                  onClick={() => handleJobStatusChange('open', job._id, setConfirmation)}
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center" 
                  >
                    <PersonIcon fontSize="large"/>
                      {job.applicants.slice(0, 3).map((e, id) => {
                        return (
                          <span key={id}>
                            {`
                              ${e.user.firstName}
                              ${e.user.lastName}${( (id === 2) || ( id === (job.applicants.length - 1)) ) ? "" : ","}
                            `}
                            &ensp;
                          </span>
                        )
                      })}
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>
                  <MenuComponent 
                    handleDelete={() => handleDelete(job)} 
                  />
                </StyledTableCell>
              </StyledTableRow>
                {job.open && job.applicants.map(applicant => (
                  <StyledTableRow key={applicant._id}>
                    <StyledTableCell>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center" 
                      >
                        <Grid
                          container
                          alignItems="center" 
                          xs={4}
                          item
                        >
                          <StyledCheckbox
                            colors="green400"
                            checked={applicant.checked}
                            onChange={() => handleApplicantStatusChange(job._id, applicant._id)}
                          />
                          <img
                            className={classes.img}
                            src="/static/img/icons/transparentNet.png"
                            alt='network Icon'
                          />
                        </Grid>
                        <Grid xs={8} item>
                          {job.organisation && job.organisation.name}
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>
                      {moment(+job.dates[0].date.startDate).format('DD/MM/YYYY')}
                      <span>&ensp;</span>
                      {moment(+job.dates[0].date.startDate).format('HH:mm')}-
                      {moment(+job.dates[0].date.endDate).format('HH:mm')}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center" 
                      >
                        <PersonIcon fontSize="large"/>
                        {`${applicant.user.firstName} ${applicant.user.lastName}`}
                        <span>&ensp;-&ensp;</span>
                        <span className={classes.highlighted}>
                          {applicant.user.user_info.qualification.level}
                        </span>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Grid container justify="center">
                        <ListAltIcon className={classes.pointer}/>
                      </Grid>
                    </StyledTableCell>
                </StyledTableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <FormControlLabel
        control={<Switch checked={showDetails} onChange={handleChangeDetails} />}
        label="Show all details"
      />
    </Grid>
  );
}

const mapStateToProps = (state) =>({
  organizationJobs: state.organizationsJobs,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrganizationJob: bindActionCreators(deleteOrganizationJob, dispatch),
  openDeletingDialog: bindActionCreators(openDeletingDialog, dispatch),
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conformation);
