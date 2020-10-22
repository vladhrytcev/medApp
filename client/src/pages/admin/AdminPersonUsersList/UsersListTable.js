import React from "react";
import { array, object, func } from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import UsersTable from './UsersTable';
import {
    Divider,
} from './styledComponent';


const propTypes = {
    usersList: array,
    local: object.isRequired,
    deletePersonUsers: func,
    personType: array
};

function UsersListTable({
    usersList,
    local,
    deletePersonUsers,
    personType
}) {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        List of all Users
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UsersTable
            usersList={usersList}
            local={local}
            deletePersonUsers={deletePersonUsers}
            personType={personType}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


UsersListTable.propTypes = propTypes;

export default UsersListTable;