import React from "react";
import styled, { withTheme } from "styled-components";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {
  indigo,
  green,
  blue,
  orange,
  red,
  pink,
  teal,
  brown
} from "@material-ui/core/colors";
import moment from 'moment';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Briefcase,
  UserCheck,
  UserPlus,
  Layout,
  Home
} from "react-feather";

import Stats from "./Stats";

import {
  Typography,
  Divider
} from './styledComponent';



function AdminDashboard({ theme }) {
  return (
    <React.Fragment>
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Welcome back,&nbsp;
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
            today is {moment().format('dddd, MMMM Do YYYY')}
          </Typography>
        </Grid>

        <Grid item></Grid>
      </Grid>

      <Divider />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Posted Jobs"
            amount="2.532"
            icon={Briefcase}
            color={blue[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Fullfilled Jobs"
            amount="2.532"
            icon={ShoppingBag}
            color={pink[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Visitors"
            amount="170.212"
            icon={Users}
            color={orange[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            icon={DollarSign}
            color={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Total internal users"
            amount="45"
            icon={UserCheck}
            color={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Total external users"
            amount="400"
            icon={UserPlus}
            color={brown[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Total organization"
            amount="400"
            icon={Home}
            color={indigo[500]}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} xl={2}>
          <Stats
            title="Total agencies"
            amount="400"
            icon={Layout}
            color={teal[500]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withTheme(AdminDashboard);