import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NursesJobUpload from './NursesJobUpload';
import MedicalsJobUpload from './MedicalsJobUpload';

const propTypes = {
  local: object,
};

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function JobUpload({ location }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Wrapper>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Pflegekraft" {...a11yProps(0)} />
          <Tab label="Anfrage" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <NursesJobUpload />
        <MedicalsJobUpload />
      </SwipeableViews>
    </Wrapper>
  );
}

JobUpload.propTypes = propTypes;

const mapStateToProps = (state) => ({
  local: state.local,
});


export default withRouter(connect(mapStateToProps)(JobUpload));