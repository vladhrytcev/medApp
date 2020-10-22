import React from "react";
import { array, object, func } from "prop-types";

import {
  Grid,
  Typography
} from "@material-ui/core";

import OrganisationsTable from './OrganisationsTable';
import {
    Divider,
} from './styledComponent';


const propTypes = {
    organisationsList: array,
    local: object.isRequired,
    deleteAdminOrganisations: func
};

function OrganisationsListTable({
    organisationsList,
    local,
    deleteAdminOrganisations
}) {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        List of all Organisations
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <OrganisationsTable
            organisationsList={organisationsList}
            local={local}
            deleteAdminOrganisations={deleteAdminOrganisations}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


OrganisationsListTable.propTypes = propTypes;

export default OrganisationsListTable;