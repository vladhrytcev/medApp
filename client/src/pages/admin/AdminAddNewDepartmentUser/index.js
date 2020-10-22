import React from "react";
import { object, func } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Link
} from "@material-ui/core";
import { bindActionCreators } from 'redux';


import { getDepartmentById, inviteNewAdminDepartmentUser } from '../../../redux/actions/adminOrgsPannel';
import AddDepartmentUserForm from './AddDepartmentUserForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  inviteNewAdminDepartmentUser: func,
  currentDepartment: object,
  match: object,
  adminOrgsPannel: object,
  getDepartmentById: func
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewDepartmentUser({
  local,
  inviteNewAdminDepartmentUser,
  currentDepartment,
  match,
  getDepartmentById,
  adminOrgsPannel
}) {

  React.useEffect(() => {
      const id = match.params.orgId;
      const depId = match.params.depId;
      getDepartmentById(id, depId);
  }, []);

  const handleAddNewDepartmentUser = (email) => {
    inviteNewAdminDepartmentUser(email);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Department User
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
            <Typography>Add New Department User</Typography>
          </Breadcrumbs>
          <AddDepartmentUserForm
            adminOrgsPannel={adminOrgsPannel}
            local={local}
            invitePerson={handleAddNewDepartmentUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewDepartmentUser.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    currentDepartment: state.adminOrgsPannel.currentDepartment,
    adminOrgsPannel: state.adminOrgsPannel
});

const mapDispatchToProps = (dispatch) => ({
  getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
  inviteNewAdminDepartmentUser: bindActionCreators(inviteNewAdminDepartmentUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewDepartmentUser);