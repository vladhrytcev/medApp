import React from 'react';
import { object, func } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrganisationAdminUsers from './OrganisationAdminUsers';
import OrganisationAdminProfile from './OrganisationAdminProfile';
import OrganisationAdminDepartments from './OrganisationAdminDepartments';



const propTypes = {
    currentOrganisation: object,
    local: object,
    editCurrentOrganisation: func,
    match: object,
    deleteAdminOrganisationDepartment: func,
    deleteAdminOrganisationUsers: func
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



function OrganisationAdminTabPannel({
    currentOrganisation,
    local,
    editCurrentOrganisation,
    match,
    deleteAdminOrganisationDepartment,
    deleteAdminOrganisationUsers
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
                    <Tab label="Organisation users" {...a11yProps(1)} />
                    <Tab label="Organisation departments" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <OrganisationAdminProfile
                    role="tabpanel"
                    hidden={value !== 0}
                    id={`full-width-tabpanel-0`}
                    aria-labelledby={`full-width-tab-0`}
                    local={local}
                    match={match}
                    currentOrganisation={currentOrganisation}
                    editCurrentOrganisation={editCurrentOrganisation}
                />
                <OrganisationAdminUsers
                    role="tabpanel"
                    hidden={value !== 1}
                    id={`full-width-tabpanel-1`}
                    aria-labelledby={`full-width-tab-1`}
                    organisationUsersList={currentOrganisation.contacts}
                    local={local}
                    match={match}
                    deleteAdminOrganisationUsers={deleteAdminOrganisationUsers}            
                />
                <OrganisationAdminDepartments
                    role="tabpanel"
                    hidden={value !== 2}
                    id={`full-width-tabpanel-2`}
                    aria-labelledby={`full-width-tab-2`}
                    organisationDepartmentsList={currentOrganisation.departments}
                    local={local}
                    match={match}
                    deleteAdminOrganisationDepartment={deleteAdminOrganisationDepartment}          
                />
            </SwipeableViews>
        </div>
    );
}

OrganisationAdminTabPannel.propTypes = propTypes;


export default OrganisationAdminTabPannel;