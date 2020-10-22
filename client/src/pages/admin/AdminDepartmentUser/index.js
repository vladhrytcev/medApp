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
  getCurrentDepartmentUser,
  getDepartmentById,
  editCurrentDepartmentUser
} from '../../../redux/actions/adminOrgsPannel';
import AdminDepartmentUserProfile from './AdminDepartmentUserProfile';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentDepartmentUser: object,
    match: object,
    getCurrentDepartmentUser: func,
    local: object,
    editCurrentDepartmentUser: func,
    getDepartmentById: func,
    currentDepartment: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminDepartmentUser({
    match,
    local,
    currentDepartmentUser,
    getCurrentDepartmentUser,
    editCurrentDepartmentUser,
    getDepartmentById,
    currentDepartment
}) {
    React.useEffect(() => {
        const id = match.params.orgId;
        const depId = match.params.depId;
        const userId = match.params.userId;
        getDepartmentById(id, depId);
        getCurrentDepartmentUser(userId);
    }, []);
  
    return (
        <div>
            {!isEmpty(currentDepartmentUser) && !isEmpty(currentDepartment) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        Department User "{currentDepartmentUser.firstName}&nbsp;{currentDepartmentUser.lastName}"
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
                                <Typography>Department User {currentDepartmentUser.firstName}&nbsp;{currentDepartmentUser.lastName}</Typography>
                            </Breadcrumbs>
                            <AdminDepartmentUserProfile
                                currentDepartmentUser={currentDepartmentUser}
                                editCurrentDepartmentUser={editCurrentDepartmentUser}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminDepartmentUser.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentDepartmentUser: state.adminOrgsPannel.currentDepartmentUser,
    currentDepartment: state.adminOrgsPannel.currentDepartment,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    getCurrentDepartmentUser: bindActionCreators(getCurrentDepartmentUser, dispatch),
    editCurrentDepartmentUser: bindActionCreators(editCurrentDepartmentUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDepartmentUser);