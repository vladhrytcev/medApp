import React from "react";
import { object, func } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { bindActionCreators } from 'redux';

import { inviteNewPersonUser } from '../../../redux/actions/adminPersonPannel';
import AddUserForm from './AddUserForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  inviteNewPersonUser: func,
  adminPersonPannel: object,
  match: object
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewPersonUser({
  local,
  inviteNewPersonUser,
  adminPersonPannel,
  match
}) {

  const handleAddNewUser = (email) => {
    inviteNewPersonUser(email);
  }

  const str = match.params.personType;
  const listType = str ? str[0].toUpperCase() + str.slice(1) : '';
  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New User
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to={`/${local.language}/admin/persons/${match.params.personType}`}>
              {listType} List
            </Link>
            <Typography>Add New User</Typography>
          </Breadcrumbs>
          <AddUserForm
            adminPersonPannel={adminPersonPannel}
            local={local}
            invitePerson={handleAddNewUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewPersonUser.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    adminPersonPannel: state.adminPersonPannel
});

const mapDispatchToProps = (dispatch) => ({
  inviteNewPersonUser: bindActionCreators(inviteNewPersonUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewPersonUser);