import React from "react";
import { func, object, string } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonsSet from './ButtonsSet';



const propTypes = {
    qualificationType: string,
    qualificationAdd: string,
    handleChangeQualificationType: func,
    handleChangeQualificationAdd: func,
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


function QualificationInfo({
    qualificationType,
    qualificationAdd,
    handleChangeQualificationType,
    handleChangeQualificationAdd,
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
                    Qualification info:
                </Typography>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Qualification type:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === ['qualification', 'level', 'type'].join('.') ? false : true}
                                margin="dense"
                                onChange={handleChangeQualificationType}
                                value={qualificationType}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['qualification', 'level', 'type']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={qualificationType}
                            />
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Additional qualification info:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === ['qualification', 'additionalInfo', 'type'].join('.') ? false : true}
                                margin="dense"
                                onChange={handleChangeQualificationAdd}
                                value={qualificationAdd}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['qualification', 'additionalInfo', 'type']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={qualificationAdd}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


QualificationInfo.propTypes = propTypes;

export default QualificationInfo;