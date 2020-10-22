import React, { useEffect, useState, Fragment} from "react";
import { object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DayJobInfo from './DayJobInfo';

const propTypes = {
    selectedDate: object,
};

const useStyles = makeStyles(theme => ({
    headerDate: {
        color: theme.palette.primary.main,
        fontWeight: 500,
        margin: '20px 0 30px 0',
    },
    filterColorFieldWrapper: {
        '&>div': {
            borderRadius: '5px 5px 0 0',
        },
        '&>div:first-child': {
            background: '#52a8ef',
        },
        '&>div:nth-child(2)': {
            background: '#f18686',
        },
        '&>div:nth-child(3)': {
            background: '#fcb183',
        },
        '&>div:nth-child(4)': {
            background: '#90d286',
        },
    },
    paperFilter: {
        height: 60,
        width: '24%',
        cursor: 'pointer',
        color: '#fff'
    },
    activeTab:{
        color: 'black',
        background: '#f8f9fd !important',
    },
    content:{
        display: 'flex',
        flexGrow: 1
    },
    wrapper: {
        background: 'white',
        padding: '20px'
    }
}));



function RightCalendarPannel({
    selectedDate,
    events
}) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState('all');
    const [currentEvents, setCurrentEvents] = useState(events)

    useEffect(() => {
        (activeTab === 'all') 
            ? setCurrentEvents(events) 
            : setCurrentEvents(filterByStatus(events, activeTab))
    }, [events, activeTab])

    const handleTabChange = tab => {
        setActiveTab(tab);
    }

    function filterByStatus(arr, value) {
        return arr.filter(el => el.status === value);
    }
    return (
        <Fragment>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                className={classes.wrapper}
            >  
                <Typography variant='h4' className={classes.headerDate}>
                    {moment(selectedDate).format('dddd, MMMM DD, YYYY')}
                </Typography>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className={classes.filterColorFieldWrapper}
                >
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        item
                        className={`
                            ${classes.paperFilter}
                            ${(activeTab === 'all') ? classes.activeTab : ''}`
                        }
                        onClick={() => handleTabChange('all')} 
                    >
                        <Typography>All</Typography>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        item 
                        className={`
                            ${classes.paperFilter}
                            ${(activeTab === 'red') ? classes.activeTab : ''}`
                        }
                        onClick={() => handleTabChange('red')} 
                    >
                        <Typography>Offene Schichten</Typography>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        item
                        className={`
                            ${classes.paperFilter}
                            ${(activeTab === 'green') ? classes.activeTab : ''}`
                        }
                        onClick={() => handleTabChange('green')} 
                    >
                        <Typography>Externe Anfragen</Typography>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        item
                        className={`
                            ${classes.paperFilter}
                            ${(activeTab === 'yellow') ? classes.activeTab : ''}`
                        }
                        onClick={() => handleTabChange('yellow')} 
                    >
                        <Typography>Bestatigung</Typography>
                    </Grid>
                </Grid>
                <DayJobInfo 
                    className={classes.content}
                    events={currentEvents}
                />
            </Grid>
        </Fragment>
    );
}

RightCalendarPannel.propTypes = propTypes;

export default RightCalendarPannel;