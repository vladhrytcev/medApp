import React from "react";
import { func, object } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import { DropzoneDialog } from 'material-ui-dropzone';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { COUNTRY_LIST } from '../../../constants/common';

import {
    LogoWraper,
} from './styledComponent';



const propTypes = {
    currentAgency: object,
    local: object,
    editCurrentAgency: func
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

function AgencyAdminProfile({
    currentAgency,
    local,
    editCurrentAgency
}) {

    const classes = useStyles();

    const [agencyName, setAgencyName] = React.useState(() => currentAgency.name);
    const [postcode, setPostcode] = React.useState(() => currentAgency.postcode);
    const [address, setAddress] = React.useState(() => currentAgency.address);
    const [country, setCountry] = React.useState(() => currentAgency.country);
    const [url, setUrl] = React.useState(() => currentAgency.url);
    const [logo, setLogo] = React.useState(() => currentAgency.logo);
    const [openAddLogo, setOpenAddLogo] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [editableField, setEditableField] = React.useState('');



    const handleEditField = (field) => () => {
        setEditableField(field)
    }

    const handleChangeAgencyName = (e) => {
        const value = e.target.value;
        setAgencyName(value);
    }

    const handleChangePostcode = (e) => {
        const value = e.target.value;
        setPostcode(value);
    }

    const handleChangeAddress = (e) => {
        const value = e.target.value;
        setAddress(value);
    }

    const handleChangeContry = (e) => {
        const value = e.target.value;
        setCountry(value);
        setEditableField('');
    }

    const handleChangeURL = (e) => {
        const value = e.target.value;
        setUrl(value);
    }

    const handleSaveField = () => {
        setEditableField('');
    }

    const handleCancelEditField = (field) => () => {
        setEditableField('');
        switch (field) {
            case 'agencyName':
                setAgencyName(currentAgency.name);
                break;
            case 'postcode':
                setPostcode(currentAgency.postcode);
                break;
            case 'address':
                setAddress(currentAgency.address);
                break;
            case 'country':
                setCountry(currentAgency.country);
                break;
            case 'url':
                setUrl(currentAgency.url);
                break;
            case 'logo':
                setFile(null);
                setLogo(currentAgency.logo);
                break;
            default: return;
        }
    }

    const handleEditLogoField = (field) => () => {
        setEditableField(field);
        setOpenAddLogo(true);
    }

    const handleCloseAddLogoDialog = () => {
        setOpenAddLogo(false);
        setEditableField('');
    }

    const handleSaveLogo = (file) => {
        setFile(file);
        setOpenAddLogo(false);
        setEditableField('');
        const reader = new FileReader();

        reader.onload = function (e) {
            setLogo(reader.result);
        }
        reader.readAsDataURL(file[0]);
    }

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const id = currentAgency.id;

        setOpenAddLogo(false);
        setFile(null);
        setEditableField('');
        const arr = [];

        if (
            currentAgency.name === agencyName &&
            currentAgency.postcode === postcode &&
            currentAgency.address === address &&
            currentAgency.country === country &&
            currentAgency.url === url &&
            currentAgency.logo === logo
        ) {
            return;
        }

        if (currentAgency.name !== agencyName) {
            arr.push({
                field: 'name',
                value: agencyName
            });
        }
        if (currentAgency.postcode !== postcode) {
            arr.push({
                field: 'postcode',
                value: postcode
            });
        }
        if (currentAgency.address !== address) {
            arr.push({
                field: 'address',
                value: address
            });
        }
        if (currentAgency.country !== country) {
            arr.push({
                field: 'country',
                value: country
            });
        }
        if (currentAgency.url !== url) {
            arr.push({
                field: 'url',
                value: url
            });
        }
        if (currentAgency.logo !== logo) {
            arr.push({
                field: 'logo',
                value: url
            });
        }

        editCurrentAgency(id, arr);
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
                                        <Grid item className={classes.fieldName}>Logo:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <LogoWraper>
                                                    <img src={logo} />
                                                </LogoWraper>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'logo' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'logo',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                        </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditLogoField('logo')}
                                                    >
                                                        Edit
                                                        </span>
                                                }
                                                {
                                                    !isEmpty(file) &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('logo')}
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
                                        <Grid item className={classes.fieldName}>Agency name:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'agencyName' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeAgencyName}
                                                    value={agencyName}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'agencyName' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'agencyName',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('agencyName')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentAgency.name !== agencyName &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('agencyName')}
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
                                                {editableField === 'postcode' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'postcode',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('postcode')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentAgency.postcode !== postcode &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('postcode')}
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
                                        <Grid item className={classes.fieldName}>Agency address:&nbsp;&nbsp;</Grid>
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
                                                {editableField === 'address' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'address',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('address')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentAgency.address !== address &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('address')}
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
                                        <Grid item className={classes.fieldName}>Country:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <Select
                                                    required
                                                    disabled={editableField === 'country' ? false : true}
                                                    margin="dense"
                                                    className={classes.selectTextField}
                                                    onChange={handleChangeContry}
                                                    value={country}
                                                    renderValue={value => `${value}`}
                                                    fullWidth
                                                >
                                                    {COUNTRY_LIST.map(option => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'country' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'country',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('country')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentAgency.country !== country &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('country')}
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
                                        <Grid item className={classes.fieldName}>URL:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'url' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeURL}
                                                    value={url}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'url' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'url',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('url')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentAgency.url !== url &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('url')}
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
                        <DropzoneDialog
                            open={openAddLogo}
                            onSave={handleSaveLogo}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            filesLimit={1}
                            onClose={handleCloseAddLogoDialog}
                            submitButtonText="Change"
                        />
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


AgencyAdminProfile.propTypes = propTypes;

export default AgencyAdminProfile;