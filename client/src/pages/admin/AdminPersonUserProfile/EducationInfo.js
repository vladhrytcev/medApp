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


function EducationInfo({
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
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell>University</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Qualification Level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentUser.education.map(row => (
                                    <TableRow key={row.university}>
                                        <TableCell component="th" scope="row">
                                            {row.university}
                                        </TableCell>
                                        <TableCell align="right">{row.startdate}</TableCell>
                                        <TableCell align="right">{row.enddate}</TableCell>
                                        <TableCell align="right">{row.qualLevel}</TableCell>
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


EducationInfo.propTypes = propTypes;

export default EducationInfo;