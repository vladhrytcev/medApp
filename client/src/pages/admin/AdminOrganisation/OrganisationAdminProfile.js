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
import OrganisationAdminPictsList from './OrganisationAdminPictsList';

import {
    LogoWraper,
} from './styledComponent';



const propTypes = {
    currentOrganisation: object,
    local: object,
    match: object,
    editCurrentOrganisation: func
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
    },
    pictureFieldWrapper: {
        width: "100%"
    }
}));

function OrganisationAdminProfile({
    currentOrganisation,
    local,
    match,
    editCurrentOrganisation
}) {

    const classes = useStyles();

    const [organisationName, setOrganisationName] = React.useState(() => currentOrganisation.name);
    const [postcode, setPostcode] = React.useState(() => currentOrganisation.postcode);
    const [address, setAddress] = React.useState(() => currentOrganisation.address);
    const [country, setCountry] = React.useState(() => currentOrganisation.country);
    const [city, setCity] = React.useState(() => currentOrganisation.city);
    const [url, setUrl] = React.useState(() => currentOrganisation.url);
    const [logo, setLogo] = React.useState(() => currentOrganisation.logo);
    const [openAddLogo, setOpenAddLogo] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [editableField, setEditableField] = React.useState('');

    React.useEffect(() => {
        setEditableField('');
    }, []);



    const handleEditField = (field) => () => {
        setEditableField(field)
    }

    const handleChangeOrganisationName = (e) => {
        const value = e.target.value;
        setOrganisationName(value);
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

    const handleChangeCity = (e) => {
        const value = e.target.value;
        setCity(value);
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
            case 'organisationName':
                setOrganisationName(currentOrganisation.name);
                break;
            case 'postcode':
                setPostcode(currentOrganisation.postcode);
                break;
            case 'address':
                setAddress(currentOrganisation.address);
                break;
            case 'country':
                setCountry(currentOrganisation.country);
                break;
            case 'city':
                setCity(currentOrganisation.city);
                break;
            case 'url':
                setUrl(currentOrganisation.url);
                break;
            case 'logo':
                setFile(null);
                setLogo(currentOrganisation.logo);
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
        const id = currentOrganisation.id;

        setOpenAddLogo(false);
        setFile(null);
        setEditableField('');
        const arr = [];

        if (
            currentOrganisation.name === organisationName &&
            currentOrganisation.postcode === postcode &&
            currentOrganisation.address === address &&
            currentOrganisation.country === country &&
            currentOrganisation.city === city &&
            currentOrganisation.url === url &&
            currentOrganisation.logo === logo
        ) {
            return;
        }

        if (currentOrganisation.name !== organisationName) {
            arr.push({
                field: 'name',
                value: organisationName
            });
        }
        if (currentOrganisation.postcode !== postcode) {
            arr.push({
                field: 'postcode',
                value: postcode
            });
        }
        if (currentOrganisation.address !== address) {
            arr.push({
                field: 'address',
                value: address
            });
        }
        if (currentOrganisation.country !== country) {
            arr.push({
                field: 'country',
                value: country
            });
        }
        if (currentOrganisation.city !== city) {
            arr.push({
                field: 'city',
                value: city
            });
        }
        if (currentOrganisation.url !== url) {
            arr.push({
                field: 'url',
                value: url
            });
        }
        if (currentOrganisation.logo !== logo) {
            arr.push({
                field: 'logo',
                value: url
            });
        }

        editCurrentOrganisation(id, arr);
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
                                                    <img src={logo} alt="logo" />
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
                                        <Grid item className={classes.fieldName}>Organisation name:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'organisationName' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeOrganisationName}
                                                    value={organisationName}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'organisationName' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'organisationName',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('organisationName')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentOrganisation.name !== organisationName &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('organisationName')}
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
                                                    currentOrganisation.postcode !== postcode &&
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
                                        <Grid item className={classes.fieldName}>Organisation address:&nbsp;&nbsp;</Grid>
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
                                                    currentOrganisation.address !== address &&
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
                                                    currentOrganisation.country !== country &&
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
                                                {editableField === 'city' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'city',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('city')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentOrganisation.city !== city &&
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.cancelEditButton]: true
                                                        })}
                                                        onClick={handleCancelEditField('city')}
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
                                                    currentOrganisation.url !== url &&
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
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Box mt={8} className={classes.pictureFieldWrapper}>
                                            <Grid item xs={12}>Pictures:&nbsp;&nbsp;</Grid>
                                            <Grid item xs={12}>
                                                <OrganisationAdminPictsList
                                                    currentOrganisation={currentOrganisation}
                                                    local={local}
                                                    match={match}
                                                />
                                            </Grid>
                                        </Box>
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


OrganisationAdminProfile.propTypes = propTypes;

export default OrganisationAdminProfile;