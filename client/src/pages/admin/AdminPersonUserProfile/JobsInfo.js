import React from "react";
import { object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';



const propTypes = {
    currentUser: object,
};


const useStyles = makeStyles(theme => ({
    infoBlockWrapper: {
        marginTop: '30px'
    },
    table: {
        maxWidth: 650,
    },
    tableHead: {
        background: theme.palette.background.default
    },
    bigTable: {
        overflowX: 'auto'
    },
    orgLogo: {
        height: 50,

    },
}));


function JobsInfo({
    currentUser,
}) {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} className={classes.infoBlockWrapper}>
                <Typography variant="h5" gutterBottom display="inline">
                    Education info:
                </Typography>
                <Grid container justify="flex-start" alignItems="center" className={classes.bigTable}>
                    <Grid item xs={12} sm container justify="flex-start" alignItems="center">
                        <Table aria-label="simple table">
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Organization Name</TableCell>
                                    <TableCell align="right">Organization Address</TableCell>
                                    <TableCell align="right">Organization Postcode</TableCell>
                                    <TableCell align="right">Organization Country</TableCell>
                                    <TableCell align="right">Organization City</TableCell>
                                    <TableCell align="right">Organization URL</TableCell>
                                    <TableCell align="right">Organization logo</TableCell>
                                    <TableCell align="right">Organization Contact</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentUser.jobs.map(row => (
                                    <TableRow key={row.title}>
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{row.startDate ? moment(row.startDate).format('MMMM Do YYYY') : ''}</TableCell>
                                        <TableCell align="right">{row.endDate ? moment(row.endDate).format('MMMM Do YYYY') : ''}</TableCell>
                                        {
                                            !isEmpty(row.location) &&
                                            <>
                                                <TableCell align="right">{row.location.name}</TableCell>
                                                <TableCell align="right">{row.location.address}</TableCell>
                                                <TableCell align="right">{row.location.postcode}</TableCell>
                                                <TableCell align="right">{row.location.country}</TableCell>
                                                <TableCell align="right">{row.location.city}</TableCell>
                                                <TableCell align="right">{row.location.url}</TableCell>
                                                <TableCell align="right">
                                                    <img src={row.location.logo} className={classes.orgLogo} alt="" />
                                                </TableCell>
                                                <TableCell align="right">{row.location.contact}</TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


JobsInfo.propTypes = propTypes;

export default JobsInfo;