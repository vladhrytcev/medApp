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
  getCurrentDepartmentCustomer,
  getDepartmentById,
  editCurrentDepartmentCustomer
} from '../../../redux/actions/adminOrgsPannel';
import AdminDepartmentCustomerProfile from './AdminDepartmentCustomerProfile';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentDepartmentCustomer: object,
    match: object,
    getCurrentDepartmentCustomer: func,
    local: object,
    editCurrentDepartmentCustomer: func,
    getDepartmentById: func,
    currentDepartment: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminDepartmentCustomer({
    match,
    local,
    currentDepartmentCustomer,
    getCurrentDepartmentCustomer,
    editCurrentDepartmentCustomer,
    getDepartmentById,
    currentDepartment
}) {
    React.useEffect(() => {
        const id = match.params.orgId;
        const depId = match.params.depId;
        const userId = match.params.userId;
        getDepartmentById(id, depId);
        getCurrentDepartmentCustomer(userId);
    }, []);
  
    return (
        <div>
            {!isEmpty(currentDepartmentCustomer) && !isEmpty(currentDepartment) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        Department Customer "{currentDepartmentCustomer.firstName}&nbsp;{currentDepartmentCustomer.lastName}"
                    </Typography>

                    <Divider my={6} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
                                    Organisation List
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation/${currentDepartment.orgId}`}>
                                    Organisation {currentDepartment.orgName}
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/department/${currentDepartment.orgId}/${currentDepartment.id}`}>
                                    Department {currentDepartment.depName}
                                </Link>
                                <Typography>Department Customer {currentDepartmentCustomer.firstName}&nbsp;{currentDepartmentCustomer.lastName}</Typography>
                            </Breadcrumbs>
                            <AdminDepartmentCustomerProfile
                                currentDepartmentCustomer={currentDepartmentCustomer}
                                editCurrentDepartmentCustomer={editCurrentDepartmentCustomer}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminDepartmentCustomer.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentDepartmentCustomer: state.adminOrgsPannel.currentDepartmentCustomer,
    currentDepartment: state.adminOrgsPannel.currentDepartment,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    getCurrentDepartmentCustomer: bindActionCreators(getCurrentDepartmentCustomer, dispatch),
    editCurrentDepartmentCustomer: bindActionCreators(editCurrentDepartmentCustomer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDepartmentCustomer);