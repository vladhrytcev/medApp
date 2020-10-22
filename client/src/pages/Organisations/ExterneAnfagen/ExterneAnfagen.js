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

function ExterneAnfager({
  organizationJobs: {
    isLoaded = false,
    isLoading = false,
    error,
    organizationJobsList,
  },
  openDeletingDialog,
  deleteOrganizationJob,
  getAllOrganizationJobs
}){
 
  const { t, i18n } = useTranslation();

  const [externeAnfagen, setExterneAnfagen] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const {order, orderBy, createSortHandler} = useSorting();
  const classes = useStyles({color: 'yellow900'});

  useEffect(() => {
    if (isLoaded || error){
      setExterneAnfagen(organizationJobsList.externeAnfagen);
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

  const handleDateStatusChange = (jobId, dateId) => {
    setExterneAnfagen(state => {
      const jobIdx = state.findIndex(el => el._id === jobId);
      const dateIdx = state[jobIdx].dates.findIndex(el => el.date._id === dateId)
      state[jobIdx].dates[dateIdx].checked = !state[jobIdx].dates[dateIdx].checked;
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
    setExterneAnfagen(state => {
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
        Externe Anfagen
      </StyledTypography>    

      <Table aria-label="customized table"> 
        <TableHead className={classes.headColor}>
          <StyledTableRow >
            <StyledTableCell>
              <TableSortLabel
                active={orderBy === 'title'}
                direction={orderBy === 'title' ? order : "asc"}
                onClick={createSortHandler('title')}
              >
                <span className={classes.paddingTop}>EXTERN</span>
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
            <StyledTableCell>PFLEGEKRAFT</StyledTableCell>
            <StyledTableCell>
              <MoreHorizIcon />
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!!externeAnfagen && 
          stableSort(externeAnfagen, getSorting(order, orderBy)).map(job => (
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
                        colors="yellow900"
                        checked={job.checked}
                        onChange={() => handleJobStatusChange('checked', job._id, setExterneAnfagen)}
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
                <StyledTableCell 
                  className={classes.pointer}
                  onClick={() => handleJobStatusChange('open', job._id, setExterneAnfagen)}
                >
                  {job.dates[0] && moment(+job.dates[0].date.startDate).format('DD/MM/YYYY')}
                  {job.dates.length > 1 && <span>&ensp;-&ensp;</span>}
                  {job.dates.length > 1 && job.dates[job.dates.length - 1] &&  moment(+job.dates[job.dates.length - 1].date.endDate).format('DD/MM/YYYY')}
                </StyledTableCell>
                <StyledTableCell>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center" 
                  >
                    <PersonIcon fontSize="large"/>
                    {`${job.applicants[0].user.firstName} ${job.applicants[0].user.lastName}`}
                    <span>&ensp;-&ensp;</span>
                    <span className={classes.highlighted}>
                      {job.applicants[0].user.user_info.qualification.level}
                    </span>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>
                  <MenuComponent 
                    handleDelete={() => handleDelete(job)} 
                  />
                </StyledTableCell>
              </StyledTableRow>
                {job.open && job.dates.map(date => (
                  <Fragment key={date.date._id}>
                    <StyledTableRow >
                        <StyledTableCell>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center" 
                            spacing={0}
                          >
                            <Grid
                              container
                              alignItems="center" 
                              xs={4}
                              item
                            >
                              <StyledCheckbox
                                colors="yellow900"
                                checked={date.date.checked}
                                onChange={() => handleDateStatusChange(job._id, date.date._id)}
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
                        {(date.type === 'Neue_Dienstanfrage') 
                          &&
                          <Fragment>
                            <StyledTableCell>
                              {moment(+date.date.startDate).format('DD/MM/YYYY')}
                              <span>&ensp;-&ensp;</span>
                              {moment(+date.date.endDate).format('DD/MM/YYYY')}
                            </StyledTableCell>
                            <StyledTableCell>
                              {moment(+date.date.startDate).format('HH:mm')} 
                              <span>&ensp;-&ensp;</span>
                              {moment(+date.date.endDate).format('HH:mm')}
                            </StyledTableCell>
                          </Fragment> 
                          ||
                          (date.type === 'vertretungsarzt') &&
                          <Fragment>
                            <StyledTableCell>
                              {date.date.activity}
                            </StyledTableCell>
                            <StyledTableCell>
                              {job.salary.find(el => el.activity === date.date.activity).cost} €/h
                            </StyledTableCell>
                          </Fragment> 
                        }
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExterneAnfager);

