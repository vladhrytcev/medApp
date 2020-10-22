import React from "react";
import { func, object, array } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { DropzoneDialog } from 'material-ui-dropzone';
import { NavLink as RouterNavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import {
    Divider,
    Breadcrumbs,
    LogoWraper
  } from './styledComponent';



const propTypes = {
    currentOrganisation: object,
    match: object,
    local: object,
    picture: object,
    editCurrentOrganisationPicture: func
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


function OrganisationPicturesForm({
    match,
    currentOrganisation,
    local,
    picture,
    editCurrentOrganisationPicture
}) {
    
    const classes = useStyles();

    const [editableField, setEditableField] = React.useState('');
    const [openAddPic, setOpenAddPic] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [pic, setPic] = React.useState(() => picture.url);
    const [description, setDescription] = React.useState(() => picture.description);


    const handleSubmitPicture = (e) => {
        e.preventDefault();
        const id = currentOrganisation.id;
        const picId = match.params.picId;
        
        const arr =[];

        if(
            picture.url === pic &&
            picture.description === description
        ) {
            return;
        }

        if(picture.description !== description) {
            arr.push({
                field: 'description',
                value: description
            });
        }

        if(picture.url !== pic) {
            arr.push({
                field: 'url',
                value: pic
            });
        }
        
        editCurrentOrganisationPicture(id, picId, arr);
        setOpenAddPic(false);
        setFile(null);
        setDescription(picture.description);
        setEditableField('');
    }

    const handleChangeDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
    }

    const handleSaveField  = () => {
        setEditableField('');
    }

    const handleEditPictureField = (field) => () => {
        setEditableField(field);
        setOpenAddPic(true);
    }

    const handleEditField = (field) => () => {
        setEditableField(field)
    }

    const handleSavePic = (file) => {
        setFile(file);
        setOpenAddPic(false);
        setEditableField('');
        const reader = new FileReader();

        reader.onload = function(e) {
            setPic(reader.result);
        }
        reader.readAsDataURL(file[0]);
    }

    const handleCloseAddPicDialog = () => {
        setOpenAddPic(false);
        setEditableField('');
    }

    const handleCancelEditField = (field) => () => {
        setEditableField('');
        switch(field) {
            case 'pic':
                setFile(null);
                const picId = match.params.picId;
                const data = currentOrganisation.pics.filter(el => el.id === picId)[0];
                setPic(data.url);
                break;
            case 'description':
                setDescription(picture.description);
                break;
        }
    }

    const handleDeletePic = () => {
        setPic('');
    }
  
    return (
        <>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitPicture} className={classes.formWrapper}>
                        <Box mb={8}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item xs={12}>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Picture:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                {
                                                    !!pic ?
                                                        <LogoWraper>
                                                            <img src={pic} alt="logo" />
                                                        </LogoWraper> :
                                                        <p>Empty</p>
                                                }
                                            </Grid>
                                            <Grid item xs={3}>
                                                <>
                                                    {editableField === 'pic' ?
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.editButtonActive]: editableField === 'pic',
                                                            })}
                                                            onClick={handleSaveField}
                                                        >
                                                            Save
                                                        </span> :
                                                        <span
                                                            className={classes.editButton}
                                                            onClick={handleEditPictureField('pic')}
                                                        >
                                                            Edit
                                                        </span>
                                                    }
                                                    {
                                                        !!pic &&
                                                            <span
                                                                className={classnames({
                                                                    [classes.editButton]: true,
                                                                    [classes.cancelEditButton]: true
                                                                })}
                                                                onClick={handleDeletePic}
                                                            >
                                                                Delete
                                                            </span>
                                                    }
                                                    {
                                                        (!isEmpty(file) || (picture.url && !pic)) && 
                                                            <span
                                                                className={classnames({
                                                                    [classes.editButton]: true,
                                                                    [classes.cancelEditButton]: true
                                                                })}
                                                                onClick={handleCancelEditField('pic')}
                                                            >
                                                                Cancel
                                                            </span>
                                                    }
                                                </>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Grid item className={classes.fieldName}>Description:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'description' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeDescription}
                                                    value={description}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'description' ?
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.editButtonActive]: editableField === 'description',
                                                            })}
                                                            onClick={handleSaveField}
                                                        >
                                                            Save
                                                        </span> :
                                                        <span
                                                            className={classes.editButton}
                                                            onClick={handleEditField('description')}
                                                        >
                                                            Edit
                                                        </span>
                                                    }
                                                    {
                                                        picture.description !== description && 
                                                            <span
                                                                className={classnames({
                                                                    [classes.editButton]: true,
                                                                    [classes.cancelEditButton]: true
                                                                })}
                                                                onClick={handleCancelEditField('description')}
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
                            open={openAddPic}
                            onSave={handleSavePic}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            filesLimit={1}
                            onClose={handleCloseAddPicDialog}
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
        </>
    );
}


OrganisationPicturesForm.propTypes = propTypes;


export default OrganisationPicturesForm;