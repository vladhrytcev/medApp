import React, { useEffect, useState, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
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

function OffeneShifts({
  organizationJobs: {
    isLoaded = false,
    isLoading = false,
    error,
    organizationJobsList
  },
  openDeletingDialog,
  deleteOrganizationJob,
  getAllOrganizationJobs,
  history
}){

  const { t, i18n } = useTranslation();
  
  const [offeneShifts, setOffeneShifts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const {order, orderBy, createSortHandler} = useSorting();
  const classes = useStyles({color: 'red300'});

  useEffect(() => {
    if (isLoaded || error){
      setOffeneShifts(organizationJobsList.offeneShifts);
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

  const handleSalaryStatusChange = (jobId, salaryId) => {
    setOffeneShifts(state => {
      const jobIdx = state.findIndex(el => el._id === jobId);
      const salaryIdx = state[jobIdx].salary.findIndex(el => el._id === salaryId)
      state[jobIdx].salary[salaryIdx].checked = !state[jobIdx].salary[salaryIdx].checked;
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
    setOffeneShifts(state => {
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

  const handleEdit = row => {
    history.push({
      pathname: `/${i18n.language}/organisations/jobUpdate/${row._id}`,
      state: row
    })
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Grid  className={classes.formWrapper} item xs={12} container justify="flex-start" alignItems="center">  
      <StyledTypography variant="h4" gutterBottom display="inline">
        Offene shifts
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
            <StyledTableCell>BEWERBUNGEN</StyledTableCell>
            <StyledTableCell>
              <MoreHorizIcon />
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!!offeneShifts && 
          stableSort(offeneShifts, getSorting(order, orderBy)).map(job => (
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
                        onChange={() => handleJobStatusChange('checked', job._id, setOffeneShifts)}
                      />
                    </Grid>
                    <Grid lg={10} md={8} className={classes.highlighted} item>
                      {job.organisation && job.organisation.name || "Org name(miss data)"}
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell
                  className={classes.pointer}
                  onClick={() => handleJobStatusChange('open', job._id, setOffeneShifts)}
                >
                  {job.orig_dept && job.orig_dept.name || "Depatment name (miss data)"}
                </StyledTableCell>
                <StyledTableCell>
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
                    {job.state && job.state.toLowerCase().includes('external')
                      ? "Etern" 
                      :
                      <Fragment>
                       <span>Inter&ensp;</span>
                       <img
                          className={classes.img}
                          src="/static/img/icons/exit.png"
                          alt='network Icon'
                        />
                      </Fragment>
                    }
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>
                  <MenuComponent 
                    handleDelete={() => handleDelete(job)}
                    handleEdit={() => handleEdit(job)} 
                  />
                </StyledTableCell>
              </StyledTableRow>
                {job.open && job.salary.map(salary => ( 
                  <StyledTableRow key={salary._id}>
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
                            checked={salary.checked}
                            onChange={() => handleSalaryStatusChange(job._id, salary._id)}
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
                      {salary.activity}
                    </StyledTableCell>
                    <StyledTableCell>
                      {salary.cost} €/h
                    </StyledTableCell>
                    <StyledTableCell>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffeneShifts));