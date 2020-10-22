import React from "react";
import { func, object } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { EMAIL_PATTERN } from '../../../constants/common';

import {
    ErrorMessage,
  } from './styledComponent';



const propTypes = {
    currentDepartmentUser: object,
    local: object,
    editCurrentDepartmentUser: func
};


const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '60%',
        marginTop: '50px',
        '@media (max-width: 1100px)': {
            width: '100%'
        }
    },
    selectTextField: {
      textAlign: 'left'
    },
    uploadButton: {
        marginTop: '10px'
    },
    uploadedFile: {
        color: theme.palette.primary.main,
        '&>span:hover': {
            cursor: 'pointer'
        }
    },
    editButton: {
        color: theme.palette.primary.main,
        opacity: .3,
        '&:hover': {
            opacity: 1,
            cursor: 'pointer'
        },
    },
    editButtonActive: {
        opacity: 1
    },
    cancelEditButton: {
        marginLeft: '15px'
    },
    fieldName: {
        width: 100
    }
}));


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminDepartmentUserProfile({
    currentDepartmentUser,
    local,
    editCurrentDepartmentUser
}) {  
    
    const classes = useStyles();

    const [email, setEmail] = React.useState(() => currentDepartmentUser.email);
    const [firstName, setFirstName] = React.useState(() => currentDepartmentUser.firstName);
    const [lastName, setLastName] = React.useState(() => currentDepartmentUser.lastName);
    const [contact, setContact] = React.useState(() => currentDepartmentUser.contact);
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
                setEmail(currentDepartmentUser.email);
                break;
            case 'firstName':
                setFirstName(currentDepartmentUser.firstName);
                break;
            case 'lastName':
                setLastName(currentDepartmentUser.lastName);
                break;
            case 'contact':
                setContact(currentDepartmentUser.contact);
                break;
        }
    }

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const id = currentDepartmentUser.id;

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
            currentDepartmentUser.email === email &&
            currentDepartmentUser.firstName === firstName &&
            currentDepartmentUser.lastName === lastName &&
            currentDepartmentUser.contact === contact
        ) {
            return;
        }

        if(currentDepartmentUser.email !== email) {
            arr.push({
                field: 'email',
                value: email
            });    
        }
        if(currentDepartmentUser.firstName !== firstName) {
            arr.push({
                field: 'firstName',
                value: firstName
            });
        }
        if(currentDepartmentUser.lastName !== lastName) {
            arr.push({
                field: 'lastName',
                value: lastName
            });
        }
        if(currentDepartmentUser.contact !== contact) {
            arr.push({
                field: 'contact',
                value: contact
            });
        }
        
        editCurrentDepartmentUser(id, arr);
    }

    
    return (
        <div>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitContact} className={classes.formWrapper}>
                        <Box mb={8}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item xs={12}>
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
                                                {editableField === 'email' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'email',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('email')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartmentUser.email !== email && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('email')}
                                                        >
                                                            Cancel
                                                        </span>
                                                }
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
                                                {editableField === 'firstName' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'firstName',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('firstName')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartmentUser.firstName !== firstName && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('firstName')}
                                                        >
                                                            Cancel
                                                        </span>
                                                }
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
                                                {editableField === 'lastName' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'lastName',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('lastName')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartmentUser.lastName !== lastName && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('lastName')}
                                                        >
                                                            Cancel
                                                        </span>
                                                }
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
                                                {editableField === 'contact' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'contact',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('contact')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartmentUser.contact !== contact && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('contact')}
                                                        >
                                                            Cancel
                                                        </span>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
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


AdminDepartmentUserProfile.propTypes = propTypes;

export default AdminDepartmentUserProfile;