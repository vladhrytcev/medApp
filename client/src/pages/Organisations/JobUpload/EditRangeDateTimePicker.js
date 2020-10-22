import React from "react";
import { bool, func, object } from "prop-types";
import classnames from 'classnames';
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
import moment from 'moment';



const propTypes = {
    isDisableCalendar: bool.isRequired,
    addSelectedRangeData: func,
    setDisableCalendar: func,
    editableData: object,
    cancelUpdate: func,
    updateDateAndTime: func
};

const useStyles = makeStyles(theme => ({
    mainWrapper: {
        textAlign: 'center',
        position: 'relative'
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



function EditRangeDateTimePicker({
    isDisableCalendar,
    addSelectedRangeData,
    setDisableCalendar,
    editableData,
    cancelUpdate,
    updateDateAndTime
}) {
    const classes = useStyles();

    const [from, setFrom] = React.useState(null);
    const [to, setTo] = React.useState(null);
    const [enteredTo, setEnteredTo] = React.useState(null);

    React.useEffect(() => {
        if(!isEmpty(editableData)){
            setFrom(new Date(editableData.from));
            setTo(new Date(editableData.to));
            setEnteredTo(new Date(editableData.to));
        }
    }, [editableData])


    const isSelectingFirstDay = (day) => {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    }


    const handleDayClick = (day, modifiers={}) => {
        if (modifiers !=={} && modifiers.disabled) {
            return;
        }

        if (Date.parse(day) === Date.parse(from) || (from && to && day >= from && day <= to)) {
            handleResetClick();
            return;
        }
        if (isSelectingFirstDay(day)) {
            setFrom(day);
            setTo(null);
            setEnteredTo(null);
        } else {
            setTo(day);
            setEnteredTo(day);
        }
    };

    const handleResetClick = () => {
        setFrom(null);
        setTo(null);
        setEnteredTo(null);
    }


    const handleDayMouseEnter= (day) => {
        if (!isSelectingFirstDay(day)) {
            setEnteredTo(day);
          }
    }


    const handleUpdateDateAndTime = () => {
        const el = {};
        el.id = editableData.id;
        el.startTime = Date.parse(from);
        el.endTime = Date.parse(to);
        updateDateAndTime(el, true);
        setFrom(null);
        setTo(null);
        setEnteredTo(null);
    }

    const handleCancelDateAndTime = () => {
        setFrom(null);
        setTo(null);
        setEnteredTo(null);
    }

    const  getFirstDayOfWeek = () => {
        return 1
    }

    const modifiers = { start: from, end: enteredTo };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
        <div className={classes.mainWrapper}>
            <DayPicker
                className={classes.datePicker}
                canChangeMonth={isDisableCalendar ? false : true}
                disabledDays={isDisableCalendar ? {daysOfWeek: [0, 1, 2, 3, 4, 5, 6]} : []}
                navbarElement={<Navbar />}
                localeUtils={ { ...LocaleUtils, getFirstDayOfWeek } }
                fromMonth={from}
                selectedDays={selectedDays}
                modifiers={modifiers}
                onDayClick={handleDayClick}
                onDayMouseEnter={handleDayMouseEnter}
            />
            {from &&
                <div>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={classes.timeFieldWrapper}>
                            <Typography variant='h6' className={classes.nameTimeField}>Start</Typography>
                            <Typography variant='h1' className={classes.nameTimeField}>
                                {moment(Date.parse(from)).format('MMMM DD YYYY')}
                            </Typography>
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
                            <Typography variant='h1' className={classes.nameTimeField}>
                                {
                                    to ?
                                    moment(Date.parse(to)).format('MMMM DD YYYY') :
                                    moment(Date.parse(from)).format('MMMM DD YYYY')
                                }
                            </Typography>
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

EditRangeDateTimePicker.propTypes = propTypes;

export default EditRangeDateTimePicker;
