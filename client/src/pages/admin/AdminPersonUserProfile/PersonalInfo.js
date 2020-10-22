import React from "react";
import { func, object, string } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonsSet from './ButtonsSet';



const propTypes = {
    email: string,
    firstName: string,
    lastName: string,
    contact: string,
    handleChangeEmail: func,
    handleChangeFirstName: func,
    handleChangeLastName: func,
    handleChangeContact: func,
    editableField: string,
    currentUser: object,
    handleSaveField: func,
    handleEditField: func,
    handleCancelEditField: func,
};


const useStyles = makeStyles(theme => ({
    fieldName: {
        width: 100
    }
}));


function PersonalInfo({
    email,
    firstName,
    lastName,
    contact,
    handleChangeEmail,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeContact,
    editableField,
    currentUser,
    handleSaveField,
    handleEditField,
    handleCancelEditField,
}) {    
    const classes = useStyles();
    
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom display="inline">
                    Personal info:
                </Typography>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Email:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'email' ? false : true}
                                margin="dense"
                                onChange={handleChangeEmail}
                                value={email}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['email']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={email}
                            />
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>First Name:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'firstName' ? false : true}
                                margin="dense"
                                onChange={handleChangeFirstName}
                                value={firstName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['firstName']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={firstName}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Last Name:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'lastName' ? false : true}
                                margin="dense"
                                onChange={handleChangeLastName}
                                value={lastName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['lastName']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={lastName}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Contact:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'contact' ? false : true}
                                margin="dense"
                                onChange={handleChangeContact}
                                value={contact}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['contact']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={contact}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


PersonalInfo.propTypes = propTypes;

export default PersonalInfo;