import React from "react";
import { func, object, string } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonsSet from './ButtonsSet';



const propTypes = {
    address: string,
    postcode: string,
    city: string,
    handleChangeAddress: func,
    handleChangePostcode: func,
    handleChangeCity: func,
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


function AddressInfo({
    address,
    postcode,
    city,
    handleChangeAddress,
    handleChangePostcode,
    handleChangeCity,
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
                    Address info:
                </Typography>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Address:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'address' ? false : true}
                                margin="dense"
                                onChange={handleChangeAddress}
                                value={address}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['address']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={address}
                            />
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>Postcode:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'postcode' ? false : true}
                                margin="dense"
                                onChange={handleChangePostcode}
                                value={postcode}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['postcode']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={postcode}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item className={classes.fieldName}>City:&nbsp;&nbsp;</Grid>
                    <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                required
                                disabled={editableField === 'city' ? false : true}
                                margin="dense"
                                onChange={handleChangeCity}
                                value={city}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['city']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={city}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}


AddressInfo.propTypes = propTypes;

export default AddressInfo;