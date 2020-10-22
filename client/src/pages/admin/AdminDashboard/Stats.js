import React from "react";
import { func, string } from 'prop-types';

import {
  Box,
  Grid
} from "@material-ui/core";

import {
  Typography,
  Card,
  IconWrapper
} from './styledComponent';


const propTypes = {
  title: string,
  amount: string,
  icon: func,
  color: string
};


function Stats({ title, amount, icon: Icon, color }) {
  return (
    <Card mb={3}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant="h3" gutterBottom>
            <Box fontWeight="fontWeightRegular">{amount}</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <IconWrapper color={color}>
            <Icon />
          </IconWrapper>
        </Grid>
      </Grid>
    </Card>
  );
}


Stats.propTypes = propTypes;

export default Stats;