import React from "react";
import { object, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CalendarToolbar from './CalendarToolbar';
import { RouterNavLink } from '../../globalStyles';

const propTypes = {
  local: object,
  setSelectedDate: func,
};

const useStyles = makeStyles(theme => ({
  addButton: {
    padding: '4px 8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 15,
    color: '#707070'
  },
  dayComponentWrapper: {
    position: 'relative',
    marginBottom: 5,
    '&>p': {
      position: 'absolute',
      left: 5,
      top: 5,
      margin: 0
    }
  },
  eventsComponentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    color: '#fff'
  },
  mainWrapper: {
    height: 'calc(100vh - 200px)',
    minHeight: 550,
    width: '100%',
    background: 'white',
    padding: '20px'
  }
}));

const CustomEvent = (local, classes) => ({event}) => { 
  return (
    <RouterNavLink to={`/${local.language}/organisations/jobUpload`}>
      <div className={classes.eventsComponentWrapper}>
        <div>{event.times.join(', ')}</div>
        <div>{event.title}</div>
      </div>
    </RouterNavLink>
)}

const DayComponent= (local, classes) => ({ label, isOffRange }) => {
  return (
    <div className={classes.dayComponentWrapper}>
      <p>{parseInt(label)}</p>
      {!isOffRange &&
        <RouterNavLink to={`/${local.language}/organisations/jobUpload`}>
          <button className={classes.addButton}>+</button>
        </RouterNavLink>
      }
    </div>
)}

const selectDate = (setSelectedDate) => (props) => {
  setSelectedDate(props.slots[0]);
}


moment.locale('ko', {
  week: {
      dow: 1,
      doy: 1,
  },
});

const localizer = momentLocalizer(moment);

function BigCalendarComponent({
  local,
  setSelectedDate,
  events
}) {
    const classes = useStyles();

    return (
        <div className={classes.mainWrapper}>
              <Calendar
                  localizer={localizer}
                  selectable
                  onSelectSlot={selectDate(setSelectedDate)}
                  popup={true}
                  views = {['month']}
                  defaultView = "month"
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  components = {{
                    toolbar : CalendarToolbar,
                    event: CustomEvent(local, classes),
                    month: {
                      dateHeader: DayComponent(local, classes)
                    },
                  }}
                  eventPropGetter={
                    (event, start, end, isSelected) => {
                        const getStatus = (status) => {
                          switch(status) {
                            case 'red':
                              return '#f18686';
                            case 'green':
                              return '#90d286';
                            default:
                              return '#fcb183'
                          }
                        }
                        let newStyle = {
                            color: 'white',
                            backgroundColor: getStatus(event.status)
                        };
                        return {
                            className: "",
                            style: newStyle
                        };
                    }
                  }
              />
        </div>
    );
}

export default BigCalendarComponent;