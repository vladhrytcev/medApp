import React from "react";
import { func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { EMAIL_PATTERN } from '../../../constants/common';
import PersonalInfo from '../AdminPersonUserProfile/PersonalInfo';

import {
    ErrorMessage,
  } from './styledComponent';



const propTypes = {
    currentUser: object,
    local: object,
    editCurrentUser: func
};


const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '60%',
        marginTop: '50px',
        '@media (max-width: 1100px)': {
            width: '100%'
        }
    }
}));


function PersonAgencyProfile({
    currentUser,
    local,
    editCurrentUser
}) {  
    
    const classes = useStyles();

    const [email, setEmail] = React.useState(() => currentUser.email);
    const [firstName, setFirstName] = React.useState(() => currentUser.firstName);
    const [lastName, setLastName] = React.useState(() => currentUser.lastName);
    const [contact, setContact] = React.useState(() => currentUser.contact);
    const [editableField, setEditableField] = React.useState('');
    const [isEmailValid, setEmailValid] = React.useState(true);



    const handleEditField = (field) => () => {
        setEditableField(field)
    }

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handleChangeFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleChangeContact = (e) => {
        const value = e.target.value;
        setContact(value);
    }


    const handleSaveField  = () => {
        setEditableField('');
    }

    const handleCancelEditField = (field) => () => {
        setEditableField('');
        switch(field) {
            case 'email':
                setEmail(currentUser.email);
                break;
            case 'firstName':
                setFirstName(currentUser.firstName);
                break;
            case 'lastName':
                setLastName(currentUser.lastName);
                break;
            case 'contact':
                setContact(currentUser.contact);
                break;
        }
    }

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const id = currentUser.id;

        setEditableField('');

        const rule = EMAIL_PATTERN.test(email);
        if (rule){
          setEmailValid(true); 
        } else {
          setEmailValid(false);
          return;
        }

        const arr =[];

        if(
            currentUser.email === email &&
            currentUser.firstName === firstName &&
            currentUser.lastName === lastName &&
            currentUser.contact === contact
        ) {
            return;
        }

        if(currentUser.email !== email) {
            arr.push({
                field: 'email',
                value: email
            });    
        }
        if(currentUser.firstName !== firstName) {
            arr.push({
                field: 'firstName',
                value: firstName
            });
        }
        if(currentUser.lastName !== lastName) {
            arr.push({
                field: 'lastName',
                value: lastName
            });
        }
        if(currentUser.contact !== contact) {
            arr.push({
                field: 'contact',
                value: contact
            });
        }

        editCurrentUser(id, arr);
    }

    
    return (
        <div>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitContact} className={classes.formWrapper}>
                        <Box mb={8}>
                            <Grid container justify="space-between" alignItems="center">
                                <PersonalInfo
                                    email={email}
                                    firstName={firstName}
                                    lastName={lastName}
                                    contact={contact}
                                    handleChangeEmail={handleChangeEmail}
                                    handleChangeFirstName={handleChangeFirstName}
                                    handleChangeLastName={handleChangeLastName}
                                    handleChangeContact={handleChangeContact}
                                    editableField={editableField}
                                    currentUser={currentUser}
                                    handleSaveField={handleSaveField}
                                    handleEditField={handleEditField}
                                    handleCancelEditField={handleCancelEditField}
                                />
                            </Grid>
                        </Box>
                        {!isEmailValid && <ErrorMessage component="h2" variant="body1" align="center">
                            Email is not valid
                        </ErrorMessage>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            SAVE&nbsp;
                            <SaveIcon />
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}


PersonAgencyProfile.propTypes = propTypes;

export default PersonAgencyProfile;