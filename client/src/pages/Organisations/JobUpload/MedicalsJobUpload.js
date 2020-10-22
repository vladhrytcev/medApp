import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import styled from "styled-components";
import moment from 'moment';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { Typography as MuiTypography } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircle from "@material-ui/icons/AddCircle";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DateTimePicker from './DateTimePicker';
import EditDateTimePicker from './EditDateTimePicker';
import RangeDateTimePicker from './RangeDateTimePicker';
import EditRangeDateTimePicker from './EditRangeDateTimePicker';
import { INSTITUT_LIST, STATION_LIST, QUALIFICATION_LIST } from '../../../constants/fakeOrgData';
import { META_INFORMATION } from '../../../constants/fakeMetaInfo';
import IconUnchecked from './IconUnchecked';
import IconCheck from './IconCheck';
import { TextField } from '../../../pages/components/FormFields';
import { saveOrgJob, updateOrgJob } from '../../../redux/actions/organizationJobs';
import { getAllAdminOrganisations } from '../../../redux/actions/adminOrgsPannel';
import { JobState } from '../../../constants/jobState';


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
    }
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
  salaryInputField: {
    width: 80
  },
  button: {
    background: 'transparent',
    border: '0',
    fontSize: '1rem',
    display: 'flex',
    outline: '0',
    color: '#9B9B9B',
    cursor: 'pointer',
    textAlign: 'left',
    height: 42
  },

  check: {
    marginRight: '1rem',
    marginTop: '0.2rem'
  },
  content: {
    paddingTop: '0.2rem',
    fontSize: '0.9rem',
    fontWeight: '100',
    lineHeight: '1.25rem'
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

function MedicalsJobUpload({
  saveOrgJob,
  updateOrgJob,
  organisationsList,
  getOrganisations,
  location: { state }
}) {

  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [institut, setInstitut] = useState('');
  const [field, setField] = useState('');
  const [isDisableCalendar, setDisableCalendar] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedRangeData, setSelectedRangeData] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [isFacharzt, setFacharzt] = useState(true);
  const [isAssistenzarzt, setAssistenzarzt] = useState(true);
  const [jobOperation, setJobOperation] = useState('Arbeitnehmerüberlassung')
  const [isAbSofort, setAbSofort] = useState(true);
  const [active, setActive] = useState('');
  const [passive, setPassive] = useState('');

  useEffect(() => {
    getOrganisations();

    if (state) {
      setTitle(state.title);
      setInstitut(state.organisation._id);
      // setStation(state.orig_dept);
      setJobOperation(state.jobOperation);
    }
  }, [])

  const handleSetValue = (e, setFunction) => {
    const value = e.target.value;
    setFunction(value);
  }

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

  const handleDeleteRangeDate = (id) => () => {
    const newData = selectedRangeData.filter(item => item.id !== id);
    if (!isEmpty(editableData) && id === editableData.id) {
      setEditableData({});
      setDisableCalendar(!isDisableCalendar);
    }
    setSelectedRangeData(newData);
  }

  const handleEditData = (id, range) => () => {
    if (!isEmpty(editableData) && editableData.id === id) {
      setEditableData({});
      setDisableCalendar(true)
      return;
    }

    setDisableCalendar(false);
    if (range) {
      setAbSofort(true);
    } else {
      setAbSofort(false);
    }
    const data = !range ?
      selectedData.filter(item => item.id === id)[0] :
      selectedRangeData.filter(item => item.id === id)[0];
    setEditableData(data);
  }

  const handleUpdateDateAndTime = (obj, range) => {

    setDisableCalendar(true);
    if (!range) {
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
    } else {
      const newDate = selectedRangeData.reduce((arr, item) => {
        if (obj.id === item.id) {
          item.startTime = obj.startTime;
          item.endTime = obj.endTime;
        }
        arr.push(item);
        return arr;
      }, []);
      setSelectedRangeData(newDate);
    }

  }

  const handleCancelUpdate = () => {
    setEditableData({});
    setDisableCalendar(true);
  }

  const handleChangeAbSofort = () => {
    if (!isEmpty(editableData) || !isDisableCalendar) return;
    setAbSofort(!isAbSofort)
  }

  const handleAddSelectedRangeData = (obj) => {
    const newData = [...selectedRangeData, obj];
    setSelectedRangeData(newData);
  }

  const getCalendarMode = () => {
    if (isAbSofort && isEmpty(editableData))
      return <RangeDateTimePicker
        isDisableCalendar={isDisableCalendar}
        setDisableCalendar={setDisableCalendar}
        addSelectedRangeData={handleAddSelectedRangeData}
      />
    if (isAbSofort && !isEmpty(editableData))
      return <EditRangeDateTimePicker
        isDisableCalendar={isDisableCalendar}
        setDisableCalendar={setDisableCalendar}
        editableData={editableData}
        cancelUpdate={handleCancelUpdate}
        updateDateAndTime={handleUpdateDateAndTime}
      />
    if (!isAbSofort && isEmpty(editableData))
      return <DateTimePicker
        isDisableCalendar={isDisableCalendar}
        addSelectedData={handleAddSelectedData}
        setDisableCalendar={setDisableCalendar}
      />
    if (!isAbSofort && !isEmpty(editableData))
      return <EditDateTimePicker
        isDisableCalendar={isDisableCalendar}
        updateDateAndTime={handleUpdateDateAndTime}
        setDisableCalendar={setDisableCalendar}
        editableData={editableData}
        cancelUpdate={handleCancelUpdate}
      />
  }

  const handleMedicalsJobUpload = (e) => {
    e.preventDefault();


    if (state) {
      updateOrgJob({
        id: state._id,
        title: title,
        organisation: institut,
        // orig_dept: station,
        jobOperation: jobOperation,
      });

    } else {

      if (
        !title ||
        !(selectedData.length || selectedRangeData.length) ||
        !field ||
        !institut
      ) {
        return;
      }

      saveOrgJob({
        title: title,
        dates: [...selectedData, ...selectedRangeData].map(e => {
          return {
            date: {
              startDate: e.startTime,
              endDate: e.endTime,
              activity: "times"
            },
            type: "vertretungsarzt"
          }
        }),
        field: field,
        state: JobState.EXTERNAL_ADV,
        organisation: institut,
        jobType: "Tagdienst",
        jobOperation: jobOperation,
        payment: "",
        salary: [
          {
            activity: "Bereitschaftsdienst",
            cost: active
          }
        ],
        subtitle: "some subtitle",
        accomodation: true,
        applicants: []
      })

      setTitle('');
      setSelectedData();
      setSelectedRangeData([]);
      setEditableData({});
      setFacharzt(true);
      setAssistenzarzt(true);
      setJobOperation('')
      setPassive('');
    }
  }

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item md={6} className={classes.fieldSide}>
          <Typography variant="h2" className={classes.headerText}>
            Vertretungsarzt - Anfrage
          </Typography>
          <TextField
            label="Title"
            gridSize={8}
            value={title}
            onChange={(e) => handleSetValue(e, setTitle)}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} className={classes.fieldWrapper}>
              <Typography variant="h6" className={classes.fieldName}>EINRICHTUNG</Typography>
              <Select
                id="select-institut"
                value={institut}
                onChange={e => handleSetValue(e, setInstitut)}
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
              <Typography variant="h6" className={classes.fieldName}>FACHBEREICH</Typography>
              <Select
                id="select-field"
                value={field}
                onChange={e => handleSetValue(e, setField)}
                IconComponent={ExpandMoreIcon}
                className={classes.root}
              >
                {META_INFORMATION.field.map(item =>
                  <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item xs={12} className={classes.fieldWrapper}>
              <button
                className={classes.button}
                onClick={handleChangeAbSofort}
              >
                <span className={classes.check}>
                  {isAbSofort ? <IconCheck /> : <IconUnchecked />}
                </span>
                <Typography variant="h6">Ab Sofort</Typography>
              </button>
            </Grid>
            <Grid item xs={12}>
              {(isEmpty(selectedData) && isEmpty(selectedRangeData)) ?
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h6">No dates selected yet</Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Add">
                      <IconButton aria-label="Add" onClick={handleDisableCalendar}>
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid> :
                <>
                  <Grid item xs={12}>
                    ZEITRAUM
                  </Grid>
                  <Grid container alignItems="center">
                    {
                      !isEmpty(selectedRangeData) && selectedRangeData.map(item =>
                        <React.Fragment key={item.id}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                              {moment(+item.startTime).format('DD/MM/YYYY')} - {moment(+item.endTime).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="h6">Time is flaxible</Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid container alignItems="center">
                              <Grid item>
                                <Tooltip title="Add">
                                  <IconButton aria-label="Add" onClick={handleDisableCalendar}>
                                    <AddCircle />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip title="Edit">
                                  <IconButton aria-label="Edit" onClick={handleEditData(item.id, true)}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <Tooltip title="Delete">
                                  <IconButton aria-label="Delete" onClick={handleDeleteRangeDate(item.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                  </Grid>
                  <Grid container alignItems="center">
                    {selectedData.map(item =>
                      <React.Fragment key={item.id}>
                        <Grid item xs={12} sm={4}>{moment(+item.startTime).format('DD/MM/YYYY')}</Grid>
                        <Grid item xs={12} sm={4}>
                          {moment(+item.startTime).format('HH:mm')} - {moment(+item.endTime).format('HH:mm')}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Grid container alignItems="center">
                            <Grid item>
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
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={4} className={classes.fieldWrapper}>
              <Typography variant="h6" className={classes.fieldName}>QUALIFICATION</Typography>
              <button
                className={classes.button}
                onClick={() => setFacharzt(!isFacharzt)}
              >
                <span className={classes.check}>
                  {isFacharzt ? <IconCheck /> : <IconUnchecked />}
                </span>
                <Typography variant="h6">Facharzt</Typography>
              </button>
              <button
                className={classes.button}
                onClick={() => setAssistenzarzt(!isAssistenzarzt)}
              >
                <span className={classes.check}>
                  {isAssistenzarzt ? <IconCheck /> : <IconUnchecked />}
                </span>
                <Typography variant="h6">Assistenzarzt</Typography>
              </button>
            </Grid>
            <Grid item xs={12} lg={8} className={classes.fieldWrapper}>
              <Typography variant="h6" className={classes.fieldName}>VERTRAGSGESTALTUNG</Typography>
              <RadioGroup
                name="JobOperation"
                value={jobOperation}
                onChange={e => handleSetValue(e, setJobOperation)}
              >
                <Grid container direction="column">
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      className={classes.button}
                      value="Arbeitnehmerüberlassung"
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="h6">Arbeitnehmerüberlassung</Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      className={classes.button}
                      value="BefristeteAnstellung"
                      control={<Radio size="medium" />}
                      label={
                        <Typography variant="h6">Befristete Anstellung</Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.fieldWrapper}>
              <Typography variant="h6" className={classes.fieldName}>VERGUTUNG</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.fieldName} alignItems="center">
                <Grid item xs={12} sm={4}>Aktiv</Grid>
                <Grid item xs={12} sm={4}>
                  <Input
                    value={active}
                    onChange={e => handleSetValue(e, setActive)}
                    className={classnames({
                      [classes.salaryInputField]: true,
                    })}
                    endAdornment={<InputAdornment position="end">&euro;/hr</InputAdornment>}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.fieldName} alignItems="center">
                <Grid item xs={12} sm={4}>Passiv</Grid>
                <Grid item xs={12} sm={4}>
                  <Input
                    value={passive}
                    onChange={e => handleSetValue(e, setPassive)}
                    className={classnames({
                      [classes.salaryInputField]: true,
                    })}
                    endAdornment={<InputAdornment position="end">&euro;/hr</InputAdornment>}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} className={classes.fieldSide}>
          {getCalendarMode()}
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleMedicalsJobUpload}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalsJobUpload));
