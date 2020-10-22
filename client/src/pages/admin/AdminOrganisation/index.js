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
    getOrganisationById,
    editOrganisationById,
    deleteAdminOrganisationUsers,
    deleteAdminOrganisationDepartment
} from '../../../redux/actions/adminOrgsPannel';

import OrganisationAdminTabPannel from './OrganisationAdminTabPannel';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';


const propTypes = {
    currentOrganisation: object,
    match: object,
    local: object,
    getOrganisationById: func,
    editOrganisationById: func,
    deleteAdminOrganisationDepartment: func,
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminOrganisation({
    match,
    currentOrganisation,
    getOrganisationById,
    local,
    editOrganisationById,
    deleteAdminOrganisationDepartment,
}) {
    React.useEffect(() => {
        const { id } = match.params;
        getOrganisationById(id);
    }, [match.params.id]);

    const handleEditCurrentOrganisation = (id, arr) => {
        editOrganisationById(id, arr);
    }

    return (
        <div>
            {
                !isEmpty(currentOrganisation) &&
                    <>
                        <Typography variant="h3" gutterBottom display="inline">
                            Organisation "{currentOrganisation.name}"
                        </Typography>

                        <Divider my={6} />

                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
                                    Organisations List
                                </Link>
                                <Typography>Organisation {currentOrganisation.name}</Typography>
                            </Breadcrumbs>
                            <OrganisationAdminTabPannel
                                local={local}
                                currentOrganisation={currentOrganisation}
                                editCurrentOrganisation={handleEditCurrentOrganisation}
                                match={match}
                                deleteAdminOrganisationUsers={deleteAdminOrganisationUsers}
                                deleteAdminOrganisationDepartment={deleteAdminOrganisationDepartment}
                            />
                            </Grid>
                        </Grid>
                    </>
            }
        </div>
    );
}


AdminOrganisation.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentOrganisation: state.adminOrgsPannel.currentOrganisation,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getOrganisationById: bindActionCreators(getOrganisationById, dispatch),
    editOrganisationById: bindActionCreators(editOrganisationById, dispatch),
    deleteAdminOrganisationUsers: bindActionCreators(deleteAdminOrganisationUsers, dispatch),
    deleteAdminOrganisationDepartment: bindActionCreators(deleteAdminOrganisationDepartment, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrganisation);