import React from 'react';
import { Grid } from '@material-ui/core';
import {
  TextField as MuiTextField
} from '@material-ui/core';

export const TextField = ({ gridSize, field, label, ...props }) => (
  <Grid item xs={gridSize}>
    <MuiTextField
      name={field}
      label={label}
      fullWidth
      {...props}
    />
  </Grid>
);