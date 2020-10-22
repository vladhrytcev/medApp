import React from "react";
import { instanceOf, func } from "prop-types";
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const propTypes = {
    date: instanceOf(Date),
    onNavigate: func,
};


const useStyles = makeStyles(theme => ({
    toolbarWrapper: {
        position: 'relative',
        marginBottom: 30,
        '& .MuiSvgIcon-root': {
            position: 'absolute',
            top: 5
        },
        '& .MuiSvgIcon-root:first-of-type': {
            left: '30%'
        },
        '& .MuiSvgIcon-root:nth-of-type(2)': {
            right: '30%'
        },
        '&>span': {
            fontSize: 24
        }
    },
}));



function CalendarToolbar({
    date,
    onNavigate
  }) {
      const classes = useStyles();
      const month = moment(Date.parse(date)).format('MMMM YYYY');
  
      return (
        <div className={classes.toolbarWrapper}>
            <ArrowBackIosIcon onClick={() => onNavigate('PREV')} />
            <span
              onClick={() => onNavigate('TODAY')}
            >
              {month}
            </span>
            <ArrowForwardIosIcon onClick={() => onNavigate('NEXT')} />
        </div>
      );
  }


CalendarToolbar.propTypes = propTypes;

export default CalendarToolbar;