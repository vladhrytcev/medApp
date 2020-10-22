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


import { getDepartmentById, inviteNewAdminDepartmentCustomer } from '../../../redux/actions/adminOrgsPannel';
import AddDepartmentCustomerForm from './AddDepartmentCustomerForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  inviteNewAdminDepartmentCustomer: func,
  currentDepartment: object,
  match: object,
  adminOrgsPannel: object,
  getDepartmentById: func
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewDepartmentCustomer({
  local,
  inviteNewAdminDepartmentCustomer,
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

  const handleAddNewDepartmentCustomer = (email) => {
    inviteNewAdminDepartmentCustomer(email);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Department Customer
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
            <Typography>Add New Department Customer</Typography>
          </Breadcrumbs>
          <AddDepartmentCustomerForm
            adminOrgsPannel={adminOrgsPannel}
            local={local}
            invitePerson={handleAddNewDepartmentCustomer}
          />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewDepartmentCustomer.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    currentDepartment: state.adminOrgsPannel.currentDepartment,
    adminOrgsPannel: state.adminOrgsPannel
});

const mapDispatchToProps = (dispatch) => ({
  getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
  inviteNewAdminDepartmentCustomer: bindActionCreators(inviteNewAdminDepartmentCustomer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewDepartmentCustomer);