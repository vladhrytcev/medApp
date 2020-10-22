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
import { genRandomId } from '../../../helpers';
import { getUserId } from '../../../helpers/index' 


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
    addNewOrganisation: func
};


function AddOrganisationForm({ addNewOrganisation }) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [organisationName, setOrganisationName] = React.useState('');
    const [postcode, setPostcode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [city, setCity] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [openAddLogo, setOpenAddLogo] = React.useState(false);

    const [openAddPics, setOpenAddPics] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [filePics, setFilePics] = React.useState({});
    const [logo, setLogo] = React.useState(null);
    const [pics, setPics] = React.useState({});
    const [isUrlValid, setUrlValid] = React.useState(true);


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
    }

    const handleChangeCity = (e) => {
        const value = e.target.value;
        setCity(value);
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

    const handleOpenAddPicsDialog = () => {
        setOpenAddPics(true);
    }

    const handleCloseAddPicsDialog = () => {
        setOpenAddPics(false);
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

    const handleDeletePics = (id) => () => {
        const newFilePics = {...filePics};
        delete newFilePics[id];
        setFilePics({...newFilePics});
        
        const newPics = {...pics};
        delete newPics[id];
        setPics({...newPics});
    }

    const handleSavePics = (file) => {
        const id = genRandomId();
        filePics[id] = file[0];
        setFilePics({...filePics});
        setOpenAddPics(false);

        const reader = new FileReader();
        reader.onload = function(e) {
            pics[id] = reader.result;
            setPics({...pics});
        }
        reader.readAsDataURL(file[0]);
    }


    const handleSubmitContact = (e) => {
        e.preventDefault();

        if(
            !organisationName ||
            !postcode ||
            !address ||
            !country ||
            !url 
            // isEmpty(file)
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

        const rawPics = Object.values(pics).map(item => item);
        const creatorId = getUserId(); //del after back fix

        addNewOrganisation({
            name: organisationName,
            postcode,
            address,
            country,
            city,
            url,
            logo,
            // pics: rawPics, //mocked URL 
            creatorId
        });
    
        setOrganisationName('');
        setPostcode('');
        setAddress('');
        setCountry('');
        setUrl('');
        setOpenAddLogo(false);
        setFile(null);
        setFilePics({});
        setPics({});
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
                                    label="Organisation Name"
                                    placeholder="Organisation Name"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeOrganisationName}
                                    value={organisationName}
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
                                    label="Organisation address"
                                    placeholder="Organisation address"
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
                                    label="City"
                                    placeholder="City"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeCity}
                                    value={city}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                <Grid container justify="flex-start" alignItems="flex-start" spacing={1}>
                                    <Grid item>
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
                                    <Grid item xs>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            onClick={handleOpenAddPicsDialog}
                                            className={classes.uploadButton}
                                        >
                                            ADD PICTURES&nbsp;
                                            <CloudUpload />
                                        </Button>
                                        {
                                            !isEmpty(filePics) && 
                                            Object.entries(filePics).map(([id, item]) =>
                                                <p
                                                    className={classes.uploadedFile}
                                                    key={id}
                                                >
                                                    {item.name}&nbsp;&nbsp;
                                                    <Tooltip
                                                        title="delete"
                                                        placement="right"
                                                        enterDelay={300}
                                                    >
                                                        <span onClick={handleDeletePics(id)}>x</span>
                                                    </Tooltip>
                                                </p>)
                                        }

                                        <DropzoneDialog
                                            open={openAddPics}
                                            onSave={handleSavePics}
                                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                            showPreviews={true}
                                            maxFileSize={5000000}
                                            filesLimit={10}
                                            onClose={handleCloseAddPicsDialog}
                                            submitButtonText="Add"
                                        />
                                    </Grid>
                                </Grid>
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
  
AddOrganisationForm.propTypes = propTypes;
  
export default AddOrganisationForm;