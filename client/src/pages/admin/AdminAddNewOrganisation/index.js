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

import AddOrganisationForm from './AddOrganisationForm';
import { addNewOrganisation } from '../../../redux/actions/adminOrgsPannel';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';



const propTypes = {
  local: object,
  addNewOrganisation: func
};


const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

function AdminAddNewOrganisation({ local, addNewOrganisation }) {

  const handleAddNewOrganisation= (
    organisationName,
    postcode,
    address,
    country,
    city,
    url,
    logo,
    pics
  ) => {
    addNewOrganisation(organisationName, postcode, address, country, city, url, logo, pics);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Organisation
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
              Organisations List
            </Link>
            <Typography>Add New Organisation</Typography>
          </Breadcrumbs>
          <AddOrganisationForm addNewOrganisation={handleAddNewOrganisation} />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewOrganisation.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
});

const mapDispatchToProps = (dispatch) => ({
    addNewOrganisation: bindActionCreators(addNewOrganisation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewOrganisation);