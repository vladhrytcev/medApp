import React from 'react';
import { object, func, array } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DepartmentAdminUsers from './DepartmentAdminUsers';
import DepartmentAdminProfile from './DepartmentAdminProfile';
import DepartmentAdminCostumers from './DepartmentAdminCostumers';



const propTypes = {
    currentDepartment: object,
    currentOrganisation: object,
    local: object,
    match: object,
    editCurrentDepartment: func,
    deleteAdminDepartmentUsers: func,
    deleteAdminDepartmentCustomers: func
};


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '20px'
  },
}));



function DepartmentAdminTabPannel({
    currentDepartment,
    currentOrganisation,
    local,
    match,
    editCurrentDepartment,
    deleteAdminDepartmentUsers,
    deleteAdminDepartmentCustomers
}) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                >
                    <Tab label="General Info" {...a11yProps(0)} />
                    <Tab label="Department users" {...a11yProps(1)} />
                    <Tab label="Department customers" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <DepartmentAdminProfile
                    role="tabpanel"
                    hidden={value !== 0}
                    id={`full-width-tabpanel-0`}
                    aria-labelledby={`full-width-tab-0`}
                    local={local}
                    currentDepartment={currentDepartment}
                    editCurrentDepartment={editCurrentDepartment}
                />
                <DepartmentAdminUsers
                    role="tabpanel"
                    hidden={value !== 1}
                    id={`full-width-tabpanel-1`}
                    aria-labelledby={`full-width-tab-1`}
                    departmentUsersList={currentDepartment.depAdmins}
                    local={local}
                    match={match}
                    deleteAdminDepartmentUsers={deleteAdminDepartmentUsers}            
                />
                <DepartmentAdminCostumers
                    role="tabpanel"
                    hidden={value !== 2}
                    id={`full-width-tabpanel-2`}
                    aria-labelledby={`full-width-tab-2`}
                    departmentCustomersList={currentDepartment.depUsers}
                    local={local}
                    match={match}
                    deleteAdminDepartmentCustomers={deleteAdminDepartmentCustomers}          
                />
                <div
                    role="tabpanel"
                    hidden={value !== 1}
                    id={`full-width-tabpanel-1`}
                    aria-labelledby={`full-width-tab-1`}
                >
                    tab 2
                </div>
                <div
                    role="tabpanel"
                    hidden={value !== 2}
                    id={`full-width-tabpanel-2`}
                    aria-labelledby={`full-width-tab-2`}
                >
                    tab 3
                </div>
            </SwipeableViews>
        </div>
    );
}

DepartmentAdminTabPannel.propTypes = propTypes;


export default DepartmentAdminTabPannel;