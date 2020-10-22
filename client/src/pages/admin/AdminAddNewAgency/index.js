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

import AddAgencyForm from './AddAgencyForm';
import { addNewAgency } from '../../../redux/actions/adminPannel';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';



const propTypes = {
  local: object,
  addNewAgency: func
};


const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

function AdminAddNewAgency({ local, addNewAgency }) {

  const handleAddNewAgency= (agencyName, postcode, address, country, url, logo) => {
    addNewAgency(agencyName, postcode, address, country, url, logo);
  }


  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        Add New Agency
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to={`/${local.language}/admin/agencies`}>
              Agencies List
            </Link>
            <Typography>Add New Agency</Typography>
          </Breadcrumbs>
          <AddAgencyForm addNewAgency={handleAddNewAgency} />
        </Grid>
      </Grid>
    </div>
  );
}

AdminAddNewAgency.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
});

const mapDispatchToProps = (dispatch) => ({
  addNewAgency: bindActionCreators(addNewAgency, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewAgency);
