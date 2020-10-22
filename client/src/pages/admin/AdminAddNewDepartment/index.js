import React from "react";
import { object, func } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { getOrganisationById, addNewDepartment } from '../../../redux/actions/adminOrgsPannel';
import AddDepartmentForm from './AddDepartmentForm';

import {
  Divider,
  Breadcrumbs,
} from './styledComponent';




const propTypes = {
  local: object,
  addNewDepartment: func,
  currentOrganisation: object,
  match: object,
  getOrganisationById: func
};



const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));



function AdminAddNewDepartment({
  local,
  addNewDepartment,
  currentOrganisation,
  match,
  getOrganisationById,
}) {

  React.useEffect(() => {
      if(isEmpty(currentOrganisation)){
        const id = match.params.orgId;
        getOrganisationById(id);
      }
  }, []);


  return (
    <div>
      {!isEmpty(currentOrganisation) &&
            <>
                <Typography variant="h3" gutterBottom display="inline">
                    Add New Department
                </Typography>

                <Divider my={6} />

                <Grid container spacing={6}>
                    <Grid item xs={12}>
                    <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                        <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
                        Organisation List
                        </Link>
                        <Link component={NavLink} exact to={`/${local.language}/admin/organisation/${match.params.orgId}`}>
                        Organisation {currentOrganisation.name}
                        </Link>
                        <Typography>Add New Department</Typography>
                    </Breadcrumbs>
                    <AddDepartmentForm
                        addNewDepartment={addNewDepartment}
                    />
                    </Grid>
                </Grid>
            </>
      }
    </div>
  );
}

AdminAddNewDepartment.propTypes = propTypes;

const mapStateToProps = (state) =>({
    local : state.local,
    currentOrganisation: state.adminOrgsPannel.currentOrganisation,
});

const mapDispatchToProps = (dispatch) => ({
  addNewDepartment: bindActionCreators(addNewDepartment, dispatch),
  getOrganisationById: bindActionCreators(getOrganisationById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewDepartment);