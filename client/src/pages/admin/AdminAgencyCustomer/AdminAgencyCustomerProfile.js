import React from "react";
import { func, object } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import {
    ErrorMessage,
  } from './styledComponent';



const propTypes = {
    currentAgencyCustomer: object,
    local: object,
    currentAgency: object
};


const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '60%',
        marginTop: '50px',
        '@media (max-width: 1100px)': {
            width: '100%'
        }
    },
    infoBlockWrapper: {
        marginTop: '30px'
    },
    table: {
        maxWidth: 650,
    },
    tableHead: {
        background: theme.palette.background.default
    },
    orgLogo: {
        height: 50,

    },
    bigTable: {
        overflowX: 'auto'
    },
    fieldName: {
        width: 100
    }
}));


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminAgencyCustomerProfile({
    currentAgencyCustomer,
    local,
    currentAgency
}) {  
    
    const classes = useStyles();
    
    return (
        <div>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <div className={classes.formWrapper}>
                        <Box mb={8}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Personal info:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Email:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.email}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>      
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>First Name:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.firstName}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Last Name:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.lastName}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Contact:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.contact}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Agency info:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Customer Agency:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgency.name}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Address info:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Address:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.address}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Postcode:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.postcode}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>City:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.city}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Qualification:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Qualification type:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.qualification.level.type}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Additional qualification info:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.qualification.additionalInfo.type}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Education:
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
                                                    {currentAgencyCustomer.education.map(row => (
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
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Skills:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Skills:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.skills.join(', ')}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Preferencies:
                                    </Typography>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Distance:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.preferences.distance}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Min Salary:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.preferences.minSalary}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Job Type:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    disabled
                                                    margin="dense"
                                                    value={currentAgencyCustomer.preferences.jobType.join(', ')}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.infoBlockWrapper}>
                                    <Typography variant="h5" gutterBottom display="inline">
                                        Jobs info:
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
                                                    {currentAgencyCustomer.jobs.map(row => (
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
                                                                            <img src={row.location.logo} className={classes.orgLogo} />
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
                            </Grid>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}


AdminAgencyCustomerProfile.propTypes = propTypes;

export default AdminAgencyCustomerProfile;