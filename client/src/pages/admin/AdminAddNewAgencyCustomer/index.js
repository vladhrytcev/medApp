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


import { getAgencyById, inviteNewAdminAgencyCustomer } from '../../../redux/actions/adminPannel';
import AddAgencyCustomerForm from './AddAgencyCustomerForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  inviteNewAdminAgencyCustomer: func,
  currentAgency: object,
  match: object,
  adminPannel: object,
  getAgencyById: func
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewAgencyCustomer({
  local,
  inviteNewAdminAgencyCustomer,
  currentAgency,
  match,
  getAgencyById,
  adminPannel
}) {

  React.useEffect(() => {
      const id = match.params.agencyId;
      getAgencyById(id);
  }, []);

  const handleAddNewAgencyUser= (email) => {
    inviteNewAdminAgencyCustomer(email);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Agency Customer
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to={`/${local.language}/admin/agencies`}>
              Agencies List
            </Link>
            <Link component={NavLink} exact to={`/${local.language}/admin/agencies/${currentAgency.id}`}>
              Agency {currentAgency.name}
            </Link>
            <Typography>Add New Agency Customer</Typography>
          </Breadcrumbs>
          <AddAgencyCustomerForm
            adminPannel={adminPannel}
            local={local}
            invitePerson={handleAddNewAgencyUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewAgencyCustomer.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    currentAgency: state.adminPannel.currentAgency,
    adminPannel: state.adminPannel
});

const mapDispatchToProps = (dispatch) => ({
  getAgencyById: bindActionCreators(getAgencyById, dispatch),
  inviteNewAdminAgencyCustomer: bindActionCreators(inviteNewAdminAgencyCustomer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewAgencyCustomer);