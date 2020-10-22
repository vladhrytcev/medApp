import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { getAllOrganizationJobs } from '../../../redux/actions/organizationJobs';
import BigCalendarComponent from './BigCalendarComponent';
import RightCalendarPannel from './RightCalendarPannel';

const EVENT_STATUS = {
  'internal_adv': 'red',
  'external_adv': 'red',
  'internal_fill': 'green',
  'external_fill': 'green',
} 

const RightPannelGrid = styled(Grid)`
  ${props => props.theme.breakpoints.down("md")} {
    margin-top: 80px !important;
    /* background: orange; */
    margin: 0 20px 0 20px;
  }
  background: transparent;
  border-radius: 5px;
  text-align: center;

`;

const LeftPannelGrid = styled(Grid)`
  /* margin: 0 20px 0 20px;*/
  /* background: orange;  */
  text-align: center;
  background: transparent;
`;

const propTypes = {
  local: object,
  match: object,
};

const getTimeString = (start, end) => {
  return `${moment(Number(start)).format('h:mm')}-${moment(Number(end)).format('h:mm A')}`;
};

const getNewCurrentEvent = (template, { startDate }) => {
  return {
    ...template,
    start: new Date(Number(startDate)),
    times: [],
  };
};

const checkIsHasGap = (current, next) => {
  current = moment(current).dayOfYear();
  next = moment(next).dayOfYear();

  return (next - current) > 1;
}

const getEvents = (jobList) => {
  let events = [];
  
  jobList.forEach(job => {
    const { _id, title, dates, state } = job;
    const event = {
      _id,
      title,
      status: EVENT_STATUS[state],
    }
    
    if(dates.length === 1) {
      const { startDate, endDate } = dates[0].date;
      const timeString = getTimeString(startDate, endDate);
      
      event.start = new Date(Number(startDate));
      event.end = new Date(Number(endDate));
      event.times = [timeString];
      
      events.push(event);
    } else {
      let currentEvent = null;
      const sortDates = dates.sort((a, b) => {
        return Number(a.date.startDate) - Number(b.date.startDate);
      });

      sortDates.forEach(({ date }) => {
        const { startDate, endDate } = date;
        if(!currentEvent) {
          currentEvent = getNewCurrentEvent(event, date);
        }
        
        if(checkIsHasGap(currentEvent.end, +startDate)) {
          events.push(currentEvent);
          currentEvent = getNewCurrentEvent(event, date);
        }
        
        const timeString = getTimeString(startDate, endDate);
        const newTimes = currentEvent.times.some(time => time === timeString) 
                          ? [...currentEvent.times] 
                          : [...currentEvent.times, timeString];
        
        currentEvent.end = new Date(Number(endDate));
        currentEvent.times = [...newTimes];
      });

      events.push(currentEvent);
    }
  });

  return events;
}

const checkInRange = (start, end, current) => {
  return ((current >= start) && (current <= end))
};

function OrganisationCalendar({
  local,
  organizationJobsList,
  getAllOrganizationJobs,
}) {

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    getAllOrganizationJobs("id");
  }, []);

  useEffect(() => {
    const { externeAnfagen, confirmation, offeneShifts } = organizationJobsList;
    const jobList = [...externeAnfagen, ...confirmation, ...offeneShifts];
    if (!isEmpty(jobList)) {
      const events = getEvents(jobList);
      setEvents(events);
    }
  }, [organizationJobsList]);

  useEffect(() => {
    let arr = events.filter(el => checkInRange(el.start, el.end, selectedDate));
    setCurrentEvents(arr)
  }, [selectedDate])
  
  return (
      <Grid 
        container
        spacing={8}
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <LeftPannelGrid container item xs={12} lg={8}>
          <BigCalendarComponent
            local={local}
            setSelectedDate={setSelectedDate}
            events={events}
          />
        </LeftPannelGrid>
        <RightPannelGrid container item xs={12}  lg={4}>
          <RightCalendarPannel
            selectedDate={selectedDate}
            events={currentEvents}
          />
        </RightPannelGrid>
      </Grid>
  );
}

OrganisationCalendar.propTypes = propTypes;

const mapStateToProps = (state) =>({
  local: state.local,
  organizationJobsList: state.organizationsJobs.organizationJobsList,
});

const mapDispatchToProps = (dispatch) => ({
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganisationCalendar));