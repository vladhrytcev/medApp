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
    getCurrentAgencyCustomer,
    getAgencyById
} from '../../../redux/actions/adminPannel';
import AdminAgencyCustomerProfile from './AdminAgencyCustomerProfile';

import {
    Divider,
    Breadcrumbs,
} from './styledComponent';



const propTypes = {
    match: object,
    getCurrentAgencyCustomer: func,
    local: object,
    getAgencyById: func,
    currentAgency: object,
    currentAgencyCustomer: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminAgencyCustomer({
    match,
    local,
    getCurrentAgencyCustomer,
    getAgencyById,
    currentAgency,
    currentAgencyCustomer
}) {
    React.useEffect(() => {
        const id = match.params.customer;
        const agencyId = match.params.id;
        getCurrentAgencyCustomer(id);
        getAgencyById(agencyId);
    }, []);
  
    return (
        <div>
            {!isEmpty(currentAgencyCustomer) && !isEmpty(currentAgency) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        Agency Customer "{currentAgencyCustomer.firstName}&nbsp;{currentAgencyCustomer.lastName}"
                    </Typography>

                    <Divider my={6} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/agencies`}>
                                    Agencies List
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/agencies/${match.params.id}`}>
                                    Agency {currentAgency.name}
                                </Link>
                                <Typography>Agency Customer {currentAgencyCustomer.firstName}&nbsp;{currentAgencyCustomer.lastName}</Typography>
                            </Breadcrumbs>
                            <AdminAgencyCustomerProfile
                                currentAgencyCustomer={currentAgencyCustomer}
                                currentAgency={currentAgency}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminAgencyCustomer.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentAgency: state.adminPannel.currentAgency,
    currentAgencyCustomer: state.adminPannel.currentAgencyCustomer,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentAgencyCustomer: bindActionCreators(getCurrentAgencyCustomer, dispatch),
    getAgencyById: bindActionCreators(getAgencyById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAgencyCustomer);