import React from "react";
import { array, object, func } from "prop-types";

import {
  Grid,
  Typography
} from "@material-ui/core";

import EnhancedTable from './EnhancedTable';
import {
    Divider,
} from './styledComponent';


const propTypes = {
    agenciesList: array,
    local: object.isRequired,
    deleteAdminAgencies: func
};

function AgenciesListTable({ agenciesList, local, deleteAdminAgencies }) {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        List of all Agencies
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable
            agenciesList={agenciesList}
            local={local}
            deleteAdminAgencies={deleteAdminAgencies}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


AgenciesListTable.propTypes = propTypes;

export default AgenciesListTable;