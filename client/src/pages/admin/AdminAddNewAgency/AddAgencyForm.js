import React from "react";
import { func } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from "@material-ui/core/Tooltip";
import CloudUpload from '@material-ui/icons/CloudUpload';
import { DropzoneDialog } from 'material-ui-dropzone';
import { COUNTRY_LIST, URL_PATTERN } from '../../../constants/common';



const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '60%',
        '@media (max-width: 699px)': {
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
    }
}));

const propTypes = {
    addNewAgency: func
};


function AddAgencyForm({ addNewAgency }) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [agencyName, setAgencyName] = React.useState('');
    const [postcode, setPostcode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [openAddLogo, setOpenAddLogo] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [logo, setLogo] = React.useState(null);
    const [isUrlValid, setUrlValid] = React.useState(true);


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
    }

    const handleChangeURL = (e) => {
        const value = e.target.value;
        setUrl(value);
    }

    const handleOpenAddLogoDialog = () => {
        setOpenAddLogo(true);
    }

    const handleCloseAddLogoDialog = () => {
        setOpenAddLogo(false);
    }

    const handleSaveLogo = (file) => {
        setFile(file);
        setOpenAddLogo(false);

        const reader = new FileReader();
        reader.onload = function(e) {
            setLogo(reader.result);
        }
        reader.readAsDataURL(file[0]);
    }

    const handleDeleteLogo = () => {
        setFile(null);
    }


    const handleSubmitContact = (e) => {
        e.preventDefault();
        if(
            !agencyName ||
            !postcode ||
            !address ||
            !country ||
            !url ||
            isEmpty(file)
        ) {
            return;
        }

        const rule = URL_PATTERN.test(url);
        if (rule){
            setUrlValid(true); 
        } else {
            setUrlValid(false);
            return;
        }

        addNewAgency(agencyName, postcode, address, country, url, logo);
    
        setAgencyName('');
        setPostcode('');
        setAddress('');
        setCountry('');
        setUrl('');
        setOpenAddLogo(false);
        setFile(null);

    }

    return (
      <div>
        <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12}>
                <form onSubmit={handleSubmitContact} className={classes.formWrapper}>
                    <Box mb={8}>
                        <Grid container justify="space-between" alignItems="flex-start" spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Agency Name"
                                    placeholder="Agency Name"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeAgencyName}
                                    value={agencyName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Postcode"
                                    placeholder="Postcode"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangePostcode}
                                    value={postcode}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    label="Agency address"
                                    placeholder="Agency address"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeAddress}
                                    value={address}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Country"
                                    select
                                    placeholder="Country"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeContry}
                                    value={country}
                                    className={classes.selectTextField}
                                    fullWidth
                                >
                                    {COUNTRY_LIST.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    error={isUrlValid ? false : true}
                                    helperText={isUrlValid ? '' : "Incorrect url"}
                                    label="URL"
                                    placeholder="URL"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeURL}
                                    value={url}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={handleOpenAddLogoDialog}
                                    className={classes.uploadButton}
                                >
                                    ADD LOGO&nbsp;
                                    <CloudUpload />
                                </Button>
                                {
                                    file && 
                                    file.map(item =>
                                        <p
                                            className={classes.uploadedFile}
                                            key={item.name}
                                        >
                                            {item.name}&nbsp;&nbsp;
                                            <Tooltip
                                                title="delete"
                                                placement="right"
                                                enterDelay={300}
                                            >
                                                <span onClick={handleDeleteLogo}>x</span>
                                            </Tooltip>
                                        </p>)
                                }

                                <DropzoneDialog
                                    open={openAddLogo}
                                    onSave={handleSaveLogo}
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    showPreviews={true}
                                    maxFileSize={5000000}
                                    filesLimit={1}
                                    onClose={handleCloseAddLogoDialog}
                                    submitButtonText="Add"
                                /> 
                            </Grid>
                        </Grid>
                    </Box>
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
  
AddAgencyForm.propTypes = propTypes;
  
export default AddAgencyForm;