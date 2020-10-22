import React from "react";
import { func, object, array } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
    getAgencyById,
    editAgencyById,
    getAgencyUsersById,
    deleteAdminAgencyUsers,
    getAgencyCustomersById,
    deleteAdminAgencyCustomer
} from '../../../redux/actions/adminPannel';
import AgencyAdminProfile from './AgencyAdminProfile';
import AgencyAdminTabPannel from './AgencyAdminTabPannel';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentAgency: object,
    match: object,
    getAgencyById: func,
    editAgencyById: func,
    local: object,
    getAgencyUsersById: func,
    agencyUsersList: array,
    getAgencyCustomersById: func,
    agencyCustomersList: array,
    deleteAdminAgencyCustomer: func
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminAgency({
    match,
    getAgencyById,
    currentAgency,
    editAgencyById,
    local,
    getAgencyUsersById,
    agencyUsersList,
    deleteAdminAgencyUsers,
    getAgencyCustomersById,
    agencyCustomersList,
    deleteAdminAgencyCustomer
}) {
    React.useEffect(() => {
        const id = match.params.id;
        getAgencyById(id);
        getAgencyUsersById(id);
        getAgencyCustomersById(id);
    }, []);


    const handleEditCurrentAgency = (id, arr) => {
        editAgencyById(id, arr);
    }
  
    return (
        <div>
            {
                !isEmpty(currentAgency) &&
                    <>
                        <Typography variant="h3" gutterBottom display="inline">
                            Agency "{currentAgency.name}"
                        </Typography>

                        <Divider my={6} />

                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/agencies`}>
                                    Agencies List
                                </Link>
                                <Typography>Agency {currentAgency.name}</Typography>
                            </Breadcrumbs>
                            <AgencyAdminTabPannel
                                local={local}
                                currentAgency={currentAgency}
                                editCurrentAgency={handleEditCurrentAgency}
                                agencyUsersList={agencyUsersList}
                                match={match}
                                deleteAdminAgencyUsers={deleteAdminAgencyUsers}
                                agencyCustomersList={agencyCustomersList}
                                deleteAdminAgencyCustomer={deleteAdminAgencyCustomer}
                            />
                            </Grid>
                        </Grid>
                    </>
            }
        </div>
    );
}


AdminAgency.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentAgency: state.adminPannel.currentAgency,
    agencyUsersList: state.adminPannel.agencyUsersList,
    agencyCustomersList: state.adminPannel.agencyCustomersList,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getAgencyById: bindActionCreators(getAgencyById, dispatch),
    editAgencyById: bindActionCreators(editAgencyById, dispatch),
    getAgencyUsersById: bindActionCreators(getAgencyUsersById, dispatch),
    deleteAdminAgencyUsers: bindActionCreators(deleteAdminAgencyUsers, dispatch),
    getAgencyCustomersById: bindActionCreators(getAgencyCustomersById, dispatch),
    deleteAdminAgencyCustomer: bindActionCreators(deleteAdminAgencyCustomer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAgency);