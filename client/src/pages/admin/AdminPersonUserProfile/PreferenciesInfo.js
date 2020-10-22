import React from "react";
import { func, object, string } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonsSet from './ButtonsSet';



const propTypes = {
    distance: string,
    minSalary: string,
    jobType: string,
    handleChangeDistance: func,
    handleChangeMinSalary: func,
    handleChangeJobType: func,
    editableField: string,
    currentUser: object,
    handleSaveField: func,
    handleEditField: func,
    handleCancelEditField: func,
};


const useStyles = makeStyles(theme => ({
    fieldName: {
        width: 100
    },
    infoBlockWrapper: {
        marginTop: '30px'
    },
}));


function PreferenciesInfo({
    distance,
    minSalary,
    jobType,
    handleChangeDistance,
    handleChangeMinSalary,
    handleChangeJobType,
    editableField,
    currentUser,
    handleSaveField,
    handleEditField,
    handleCancelEditField,
}) {    
    const classes = useStyles();
    
    return (
        <>
            <Grid item xs={12} className={classes.infoBlockWrapper}>
                <Typography variant="h5" gutterBottom display="inline">
                    Preferencies:
                </Typography>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Distance:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === ['preferences', 'distance'].join('.') ? false : true}
                                margin="dense"
                                onChange={handleChangeDistance}
                                value={distance}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['preferences', 'distance']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={distance}
                            />
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Min Salary:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === ['preferences', 'minSalary'].join('.') ? false : true}
                                margin="dense"
                                onChange={handleChangeMinSalary}
                                value={minSalary}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['preferences', 'minSalary']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={minSalary}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Job Type:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === ['preferences', 'jobType'].join('.') ? false : true}
                                margin="dense"
                                onChange={handleChangeJobType}
                                value={jobType}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['preferences', 'jobType']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={jobType}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


PreferenciesInfo.propTypes = propTypes;

export default PreferenciesInfo;