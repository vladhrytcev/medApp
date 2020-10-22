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


import { addNewAgencyUser, getAgencyById, inviteNewAdminAgencyUser } from '../../../redux/actions/adminPannel';
import AddAgencyUserForm from './AddAgencyUserForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  addNewAgencyUser: func,
  currentAgency: object,
  match: object,
  adminPannel: object
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewAgencyUser({
  local,
  addNewAgencyUser,
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
    inviteNewAdminAgencyUser(email);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Agency User
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
            <Typography>Add New Agency User</Typography>
          </Breadcrumbs>
          <AddAgencyUserForm
            adminPannel={adminPannel}
            local={local}
            invitePerson={handleAddNewAgencyUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewAgencyUser.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    currentAgency: state.adminPannel.currentAgency,
    adminPannel: state.adminPannel
});

const mapDispatchToProps = (dispatch) => ({
  addNewAgencyUser: bindActionCreators(addNewAgencyUser, dispatch),
  getAgencyById: bindActionCreators(getAgencyById, dispatch),
  inviteNewAdminAgencyUser: bindActionCreators(inviteNewAdminAgencyUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewAgencyUser);