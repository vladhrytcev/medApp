import React from "react";
import { func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
    getOrganisationById,
    editDepartmentById,
    deleteAdminDepartmentUsers,
    getDepartmentById,
    deleteAdminDepartmentCustomers
} from '../../../redux/actions/adminOrgsPannel';

import DepartmentAdminTabPannel from './DepartmentAdminTabPannel';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentOrganisation: object,
    match: object,
    local: object,
    getOrganisationById: func,
    editDepartmentById: func,
    deleteAdminDepartmentUsers: func,
    getDepartmentById: func,
    currentDepartment: object,
    deleteAdminDepartmentCustomers: func
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminDepartment({
    match,
    currentOrganisation,
    getOrganisationById,
    local,
    editDepartmentById,
    deleteAdminDepartmentUsers,
    getDepartmentById,
    currentDepartment,
    deleteAdminDepartmentCustomers
}) {
    React.useEffect(() => {
        const id = match.params.orgId;
        const depId = match.params.depId;
        getOrganisationById(id);
        getDepartmentById(id, depId);
    }, []);


    const handleEditCurrentDepartment = (id, arr) => {
        editDepartmentById(id, arr);
    }

    return (
        <div>
            {
                !isEmpty(currentOrganisation) && !isEmpty(currentDepartment) &&
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
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation/${match.params.orgId}`}>
                                    Organisation {currentOrganisation.name}
                                </Link>
                                <Typography>Department {currentDepartment.depName}</Typography>
                            </Breadcrumbs>
                            <DepartmentAdminTabPannel
                                local={local}
                                currentDepartment={currentDepartment}
                                currentOrganisation={currentOrganisation}
                                editCurrentDepartment={handleEditCurrentDepartment}
                                match={match}
                                deleteAdminDepartmentUsers={deleteAdminDepartmentUsers}
                                deleteAdminDepartmentCustomers={deleteAdminDepartmentCustomers}
                            />
                            </Grid>
                        </Grid>
                    </>
            }
        </div>
    );
}


AdminDepartment.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentOrganisation: state.adminOrgsPannel.currentOrganisation,
    currentDepartment: state.adminOrgsPannel.currentDepartment,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getOrganisationById: bindActionCreators(getOrganisationById, dispatch),
    editDepartmentById: bindActionCreators(editDepartmentById, dispatch),
    deleteAdminDepartmentUsers: bindActionCreators(deleteAdminDepartmentUsers, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    deleteAdminDepartmentCustomers: bindActionCreators(deleteAdminDepartmentCustomers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDepartment);