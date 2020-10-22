import React from 'react';
import { object, func, array } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AgencyAdminUsers from './AgencyAdminUsers';
import AgencyAdminProfile from './AgencyAdminProfile';
import AgencyAdminCostumers from './AgencyAdminCostumers';



const propTypes = {
    currentAgency: object,
    local: object,
    editCurrentAgency: func,
    agencyUsersList: array,
    match: object,
    deleteAdminAgencyUsers: func,
    agencyCustomersList: array,
    deleteAdminAgencyCustomer: func
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



function AgencyAdminTabPannel({
    currentAgency,
    local,
    editCurrentAgency,
    agencyUsersList,
    match,
    deleteAdminAgencyUsers,
    agencyCustomersList,
    deleteAdminAgencyCustomer
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
                    <Tab label="Agency users" {...a11yProps(1)} />
                    <Tab label="Agency customers" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <AgencyAdminProfile
                    role="tabpanel"
                    hidden={value !== 0}
                    id={`full-width-tabpanel-0`}
                    aria-labelledby={`full-width-tab-0`}
                    local={local}
                    currentAgency={currentAgency}
                    editCurrentAgency={editCurrentAgency}
                />
                <AgencyAdminUsers
                    role="tabpanel"
                    hidden={value !== 1}
                    id={`full-width-tabpanel-1`}
                    aria-labelledby={`full-width-tab-1`}
                    agencyUsersList={agencyUsersList}
                    local={local}
                    match={match}
                    deleteAdminAgencyUsers={deleteAdminAgencyUsers}
                />
                <AgencyAdminCostumers
                    role="tabpanel"
                    hidden={value !== 2}
                    id={`full-width-tabpanel-2`}
                    aria-labelledby={`full-width-tab-2`}
                    agencyCustomersList={agencyCustomersList}
                    local={local}
                    match={match}
                    deleteAdminAgencyCustomer={deleteAdminAgencyCustomer}
                />
            </SwipeableViews>
        </div>
    );
}

AgencyAdminTabPannel.propTypes = propTypes;


export default AgencyAdminTabPannel;