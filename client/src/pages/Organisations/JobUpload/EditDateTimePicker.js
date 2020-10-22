
import React from "react";
import { bool, func } from "prop-types";
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimeField from 'react-simple-timefield';
import moment from 'moment';



const propTypes = {
    isDisableCalendar: bool.isRequired,
    updateDateAndTime: func,
    setDisableCalendar: func,
    cancelUpdate: func,
};

const useStyles = makeStyles(theme => ({
    mainWrapper: {
        textAlign: 'center'
    },
    arrow: {
        position: 'relative',
        '&>svg': {
            position: "absolute",
            top: 20
        },
        '&>svg:first-of-type': {
            left: 0,
        },
        '&>svg:nth-of-type(2)': {
            right: 0,
        },
    },
    datePicker: {
        '& .DayPicker-Day': {
            outline: 'none',
        },
        '& .DayPicker-wrapper': {
            outline: 'none',
        },
        '& .DayPicker-Caption': {
            textAlign: 'center!important'
        }
    },
    timeWrapper: {
        outline: 'none',
        border: 'none',
        width: '110px !important',
        height: 50,
        fontSize: 40,
        fontWeight: 300,
        color: theme.palette.primary.main,
    },
    middleTimeField: {
        padding: '0 20px',
        '@media (min-width: 1050px)': {
            padding: '0 40px',
        }
    },
    timeFieldLine: {
        height: 40,
        width: 1,
        background: 'rgba(0, 0, 0, 0.12)'
    },
    nameTimeField: {
        fontWeight: 300,
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.32)'
    },
    buttonWrapper: {
        textAlign: 'center',
        margin: '10px 20px',
        '& button': {
            width: 170
        }
    },
    timeFieldWrapper: {
        textAlign: 'center',
    },
    smallMiddleTimeField: {
        padding: '20px 0',
        textAlign: 'center'
    }
}));



const Navbar = ({
    onPreviousClick,
    onNextClick,
}) => {
    const classes = useStyles();

    return (
      <div className={classes.arrow}>
          <ArrowBackIosIcon onClick={() => onPreviousClick()} />
          <ArrowForwardIosIcon onClick={() => onNextClick()} />
      </div>
    );
};



function EditDateTimePicker({
    isDisableCalendar,
    updateDateAndTime,
    setDisableCalendar,
    editableData,
    cancelUpdate
}) {
    const classes = useStyles();

    const [selectedDays, setSelectedDays] = React.useState(null);
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    React.useEffect(() => {
        if(!isEmpty(editableData)){
            setSelectedDays(new Date(editableData.date));
            setStartTime(editableData.startTime);
            setEndTime(editableData.endTime)
        }
    }, [editableData])



    const handleDayClick = (day, modifiers={}) => {   
        if (modifiers !=={} && modifiers.disabled) {
            return;
        }

        const newDate = modifiers.selected ? undefined : day;
        setSelectedDays(newDate);
    };

    const handleStartTimeChange = (e) => {
        const value = e.target.value;
        setStartTime(value);
    };

    const handleEndTimeChange = (e) => {
        const value = e.target.value;
        setEndTime(value);
    };

    const handleUpdateDateAndTime = () => {
        const el = {};
        el.id = editableData.id;
        el.date = Date.parse(selectedDays);
        el.startTime = startTime;
        el.endTime = endTime;
        updateDateAndTime(el);
        setSelectedDays(null);
        setStartTime('');
        setEndTime('');
    }

    const handleCancelDateAndTime = () => {
        setSelectedDays(null);
        setStartTime('');
        setEndTime('');
        cancelUpdate();
    }

    const  getFirstDayOfWeek = () => {
        return 1
    }

    const getDate = () => {
        if(Array.isArray(selectedDays) && selectedDays.length === 0) return '';
        const date = moment(Date.parse(selectedDays)).format('MMMM DD YYYY');
        return date
    }
  


    return (
        <div className={classes.mainWrapper}>
            <DayPicker
                canChangeMonth={isDisableCalendar ? false : true}
                disabledDays={isDisableCalendar ? {daysOfWeek: [0, 1, 2, 3, 4, 5, 6]} : []}
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
                navbarElement={<Navbar />}
                localeUtils={ { ...LocaleUtils, getFirstDayOfWeek } }
                className={classes.datePicker}
            />
            {!!selectedDays &&
                <div>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={classes.timeFieldWrapper}>
                            <Typography variant='h6' className={classes.nameTimeField}>Start</Typography>
                            <div>
                                <Typography variant='h6' className={classes.nameTimeField}>
                                    {getDate()}
                                </Typography>
                            </div>
                            <TimeField
                                value={startTime}
                                onChange={handleStartTimeChange}
                                className={classes.timeWrapper}
                            />
                        </Grid>
                        <Hidden xsDown>
                            <Grid item className={classes.middleTimeField}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item><div className={classes.timeFieldLine} /></Grid>
                                    <Grid item><div>to</div></Grid>
                                    <Grid item><div className={classes.timeFieldLine} /></Grid>
                                </Grid>
                            </Grid>
                        </Hidden>
                        <Hidden smUp>
                            <Grid item xs={12} className={classes.middleTimeField}>
                                <div className={classes.smallMiddleTimeField}>to</div>
                            </Grid>
                        </Hidden>
                        <Grid item className={classes.timeFieldWrapper}>
                            <Typography variant='h6' className={classes.nameTimeField}>End</Typography>
                            <div>
                                <Typography variant='h6' className={classes.nameTimeField}>
                                    {getDate()}
                                </Typography>
                            </div>
                            <TimeField
                                value={endTime}
                                onChange={handleEndTimeChange}
                                className={classes.timeWrapper}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Box className={classes.buttonWrapper}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleUpdateDateAndTime}
                                >
                                    UPDATE
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box className={classes.buttonWrapper}>
                                <Button
                                    variant="contained"
                                    onClick={handleCancelDateAndTime}
                                >
                                    CANCEL
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
}

EditDateTimePicker.propTypes = propTypes;

export default EditDateTimePicker;
