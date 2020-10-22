import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { Typography as MuiTypography } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircle from "@material-ui/icons/AddCircle";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateTimePicker from './DateTimePicker';
import EditDateTimePicker from './EditDateTimePicker';
import { PERSONAL_WAHLEN_LIST, QUALIFICATION_LIST } from '../../../constants/fakeOrgData';
import moment from 'moment';
import { TextField } from '../../../pages/components/FormFields';
import { saveOrgJob, updateOrgJob } from '../../../redux/actions/organizationJobs';
import { getAllAdminOrganisations } from '../../../redux/actions/adminOrgsPannel';
import { JobState } from '../../../constants/jobState'
import { debug } from "winston";

const useStyles = makeStyles(theme => ({
  headerText: {
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 300,
    color: theme.palette.primary.main,
  },
  root: {
    "&::before": {
      width: 0
    },
    "&::after": {
      borderBottom: 'none'
    },
    maxWidth: 300,
  },
  fieldSide: {
    textAlign: 'left',
    fontWeight: 300
  },
  fieldName: {
    marginBottom: 10
  },
  fieldWrapper: {
    marginTop: 20
  },
  buttonWrapper: {
    marginTop: 50,
    textAlign: 'left',
    '& button': {
      width: 200
    }
  },
  selectField: {
    maxWidth: 300,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};


const Typography = styled(MuiTypography)`
  font-weight: 500 !important;
`;

function NursesJobUpload({
  saveOrgJob,
  updateOrgJob,
  organisationsList,
  getOrganisations,
  location: { state }
}) {

  const classes = useStyles();

  const [stationList, setStationList] = useState([]);

  const [institut, setInstitut] = useState('');
  const [station, setStation] = useState('');
  const [qualification, setQualification] = useState([QUALIFICATION_LIST[0]]);
  const [isDisableCalendar, setDisableCalendar] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [personalWaehlen, setPersonalWaehlen] = useState(PERSONAL_WAHLEN_LIST[0]);


  useEffect(() => {
    getOrganisations();

    if (state) {
      setTitle(state.title);
      setInstitut(state.organisation._id);
      // setStation(state.orig_dept);
      setQualification(state.skills);
      setDesc(state.desc);
    };
  }, [])
  const handleSetValue = (e, setFunction) => {
    const value = e.target.value;
    setFunction(value);
  }

  useEffect(() => {
    if (!institut) {
      return;
    }

    const newStationList = organisationsList.find(({ _id }) => _id === institut)
      .departments;
    setStationList(newStationList);
  }, [institut]);

  const handleDisableCalendar = () => {
    if (!isEmpty(editableData)) {
      setEditableData({});
      setDisableCalendar(false)
    } else {
      setDisableCalendar(!isDisableCalendar);
    }
  }

  const handleAddSelectedData = (data) => {
    const newData = [...selectedData, ...data];
    setSelectedData(newData);
  }

  const handleDeleteDate = (id) => () => {
    const newData = selectedData.filter(item => item.id !== id);
    if (!isEmpty(editableData) && id === editableData.id) {
      setEditableData({});
      setDisableCalendar(!isDisableCalendar);
    }
    setSelectedData(newData);
  }

  const handleEditData = (id) => () => {
    if (!isEmpty(editableData) && editableData.id === id) {
      setEditableData({});
      setDisableCalendar(true)
      return;
    }

    setDisableCalendar(false);
    const data = selectedData.filter(item => item.id === id)[0];
    setEditableData(data);
  }

  const handleUpdateDateAndTime = (obj) => {
    setDisableCalendar(true);
    const newDate = selectedData.reduce((arr, item) => {
      if (obj.id === item.id) {
        item.date = obj.date;
        item.startTime = obj.startTime;
        item.endTime = obj.endTime;
      }
      arr.push(item);
      return arr;
    }, []);
    setSelectedData(newDate);
  }

  const handleCancelUpdate = () => {
    setEditableData({});
    setDisableCalendar(true)
  }

  const handleSendNurseJobUpload = (e) => {
    e.preventDefault();

    if (state) {
      updateOrgJob({
        id: state._id,
        title: title,
        organisation: institut,
        // orig_dept: station,
        skills: qualification,
        desc: desc,
      });
    } else {

      if (
        !title ||
        !selectedData.length ||
        !station ||
        !institut
      ) {
        return;
      }

      saveOrgJob({
        title: title,
        desc: desc,
        dates: selectedData.map(e => {
          return {
            date: {
              startDate: e.startTime,
              endDate: e.endTime,
              activity: "times"
            },
            type: "Neue_Dienstanfrage"
          }
        }),
        skills: qualification,
        orig_dept: station,
        state: JobState.INTERNAL_ADV,
        organisation: institut,
        applicants: [],
        jobType: "Tagdienst",
        timeLimit: '0',
        orig_submission: []
      })
    }
  }

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item xs={12} md={6} className={classes.fieldSide}>
          <Typography variant="h2" className={classes.headerText}>
            Neue Dienstanfrage: Pflegekraft
          </Typography>
          <Grid container spacing={2}>
            <TextField
              label="Title"
              gridSize={8}
              value={title}
              onChange={(e) => handleSetValue(e, setTitle)}
            />
            <Grid container>
              <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
                <Typography variant="h6" className={classes.fieldName}>EINRICHTUNG</Typography>
                <Select
                  id="select-institut"
                  value={institut}
                  onChange={(e) => handleSetValue(e, setInstitut)}
                  IconComponent={ExpandMoreIcon}
                  className={classes.root}
                  MenuProps={MenuProps}
                >
                  {!!organisationsList && organisationsList.map(item =>
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
                <Typography variant="h6" className={classes.fieldName}>STATION</Typography>
                <Select
                  id="select-station"
                  value={station}
                  onChange={(e) => handleSetValue(e, setStation)}
                  IconComponent={ExpandMoreIcon}
                  className={classes.root}
                  disabled={stationList.length === 0}
                >
                  {stationList && stationList.map(item =>
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  )}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.fieldWrapper}>
              {isEmpty(selectedData) ?
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h6">No dates selected yet</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Add">
                      <IconButton aria-label="Add" onClick={handleDisableCalendar}>
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid> :
                <>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
                      DATUM
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
                      ZEITEN
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center">
                    {selectedData.map(item =>
                      <React.Fragment key={item.id}>
                        <Grid item xs={12} sm={4} className={classes.fieldWrapper}>{moment(+item.startTime).format('DD/MM/YYYY')}</Grid>
                        <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
                          {moment(+item.startTime).format('HH:mm')} - {moment(+item.endTime).format('HH:mm')}
                        </Grid>
                        <Grid item sm={4} className={classes.fieldWrapper}>
                          <Grid container alignItems="center">
                            <Grid item >
                              <Tooltip title="Add">
                                <IconButton aria-label="Add" onClick={handleDisableCalendar}>
                                  <AddCircle />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip title="Edit">
                                <IconButton aria-label="Edit" onClick={handleEditData(item.id)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip title="Delete">
                                <IconButton aria-label="Delete" onClick={handleDeleteDate(item.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </>
              }
            </Grid>
            <Grid item xs={12} className={classes.fieldWrapper}>
              <Typography variant="h6" className={classes.fieldName}>QUALIFICATION</Typography>
              <Select
                id="select-qualification"
                multiple
                value={qualification}
                onChange={(e) => handleSetValue(e, setQualification)}
                IconComponent={ExpandMoreIcon}
                className={classes.root}
              >
                {QUALIFICATION_LIST.map(item =>
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                )}
              </Select>
            </Grid>
          </Grid>
          <TextField
            label="Descriprion"
            gridSize={8}
            value={desc}
            multiline
            onChange={(e) => handleSetValue(e, setDesc)}
          />
          <Grid item xs={12} className={classes.fieldWrapper}>
            <Typography variant="h6" className={classes.fieldName}>
              PERSONAL WAHLEN
            </Typography>
            <Select
              id="select-qualification"
              value={personalWaehlen}
              onChange={(e) => handleSetValue(e, setPersonalWaehlen)}
              IconComponent={ExpandMoreIcon}
              className={classes.root}
            >
              {PERSONAL_WAHLEN_LIST.map(item =>
                <MenuItem key={item} value={item}>{item}</MenuItem>
              )}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.fieldSide}>
          {isEmpty(editableData) ?
            <DateTimePicker
              isDisableCalendar={isDisableCalendar}
              addSelectedData={handleAddSelectedData}
              setDisableCalendar={setDisableCalendar}
            /> :
            <EditDateTimePicker
              isDisableCalendar={isDisableCalendar}
              updateDateAndTime={handleUpdateDateAndTime}
              setDisableCalendar={setDisableCalendar}
              editableData={editableData}
              cancelUpdate={handleCancelUpdate}
            />
          }
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSendNurseJobUpload}
            >
              BESTATIGEN
                </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}


const mapStateToProps = (state) => ({
  organisationsList: state.adminOrgsPannel.organisationsList,
});

const mapDispatchToProps = (dispatch) => ({
  saveOrgJob: bindActionCreators(saveOrgJob, dispatch),
  updateOrgJob: bindActionCreators(updateOrgJob, dispatch),
  getOrganisations: bindActionCreators(getAllAdminOrganisations, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NursesJobUpload));
