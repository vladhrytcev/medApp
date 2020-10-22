import React from "react";
import { func, object, array } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { NavLink as RouterNavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from '@material-ui/core/styles';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentOrganisation: object,
    local: object,
    match: object
};

const useStyles = makeStyles(theme => ({
    tableHead: {
        background: theme.palette.background.default
    },
    picture: {
        height: 50,
    },
    viewLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}));


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function OrganisationAdminPictsList({
    currentOrganisation,
    local,
    match
}) {

    const classes = useStyles();

    return (
        <div>
            <Table aria-label="simple table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>Picture</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentOrganisation.pics.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <img
                                    src={row.url}
                                    alt="pic"
                                    className={classes.picture}
                                />
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">
                                <NavLink
                                    to={`/${local.language}/admin/viewOrganisationPicts/${match.params.id}/${row.id}`}
                                    className={classes.viewLink}
                                >
                                    View Details
                                </NavLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}


OrganisationAdminPictsList.propTypes = propTypes;


export default OrganisationAdminPictsList;