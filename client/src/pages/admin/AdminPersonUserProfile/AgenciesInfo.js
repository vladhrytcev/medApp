import React from "react";
import { object } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



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
}));


function AgenciesInfo({
    currentUser,
}) {    
    const classes = useStyles();
    
    return (
        <>
            <Grid item xs={12} className={classes.infoBlockWrapper}>
                <Typography variant="h5" gutterBottom display="inline">
                    Agencies info:
                </Typography>
                <Grid container justify="flex-start" alignItems="center" className={classes.bigTable}>
                    <Grid item xs={12} sm container justify="flex-start" alignItems="center">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell>Agency Name</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Postcode</TableCell>
                                    <TableCell align="right">Country</TableCell>
                                    <TableCell align="right">URL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentUser.agencyId.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{row.postcode}</TableCell>
                                        <TableCell align="right">{row.country}</TableCell>
                                        <TableCell align="right">{row.url}</TableCell>
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


AgenciesInfo.propTypes = propTypes;

export default AgenciesInfo;