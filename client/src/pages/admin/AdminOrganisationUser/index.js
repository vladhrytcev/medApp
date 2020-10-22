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
  editCurrentOrganisationUser,
  getOrganisationById
} from '../../../redux/actions/adminOrgsPannel';
import AdminOrganisationUserProfile from './AdminOrganisationUserProfile';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentOrganisationUser: array,
    match: object,
    local: object,
    editCurrentOrganisationUser: func,
    getAgencyById: func,
    currentOrganisation: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminOrganisationUser({
    match,
    local,
    currentOrganisationUser,
    editCurrentOrganisationUser,
    getOrganisationById,
    currentOrganisation
}) {
    React.useEffect(() => {
        const orgId = match.params.id;
        getOrganisationById(orgId);
    }, []);
  
    const currentUser = !isEmpty(currentOrganisation) && currentOrganisationUser.filter(item => item.id === match.params.user)[0];
    return (
        <div>
            {!isEmpty(currentUser) && !isEmpty(currentOrganisation) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        Organisation User "{currentUser.firstName}&nbsp;{currentUser.lastName}"
                    </Typography>

                    <Divider my={6} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
                                    Organisations List
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation/${match.params.id}`}>
                                    Organisation {currentOrganisation.name}
                                </Link>
                                <Typography>Organisation User {currentUser.firstName}&nbsp;{currentUser.lastName}</Typography>
                            </Breadcrumbs>
                            <AdminOrganisationUserProfile
                                currentOrganisationUser={currentUser}
                                editCurrentOrganisationUser={editCurrentOrganisationUser}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminOrganisationUser.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentOrganisationUser: state.adminOrgsPannel.currentOrganisation.contacts,
    currentOrganisation: state.adminOrgsPannel.currentOrganisation,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    editCurrentOrganisationUser: bindActionCreators(editCurrentOrganisationUser, dispatch),
    getOrganisationById: bindActionCreators(getOrganisationById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrganisationUser);