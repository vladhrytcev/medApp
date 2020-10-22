import React from "react";
import { func, object } from 'prop-types';
import { NavLink as RouterNavLink } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';



const propTypes = {
    currentDepartment: object,
    local: object,
    editCurrentDepartment: func
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


function DepartmentAdminProfile({
    currentDepartment,
    local,
    editCurrentDepartment
}) {  
    
    const classes = useStyles();

    const [depName, setDepName] = React.useState(() => currentDepartment.depName);
    const [skills, setSkills] = React.useState(() => currentDepartment.depDefaultSkills);
    const [editableField, setEditableField] = React.useState('');



    const handleEditField = (field) => () => {
        setEditableField(field)
    }

    const handleChangeDepName = (e) => {
        const value = e.target.value;
        setDepName(value);
    }

    const handleChangeSkills = (e) => {
        const value = e.target.value;
        setSkills(value);
    }

    const handleSaveField  = () => {
        setEditableField('');
    }

    const handleCancelEditField = (field) => () => {
        setEditableField('');
        switch(field) {
            case 'depName':
                setDepName(currentDepartment.depName);
                break;
            case 'skills':
                setSkills(currentDepartment.depDefaultSkills);
                break;
        }
    }

    const handleSubmitContact = (e) => {
        e.preventDefault();
        const id = currentDepartment.id;
        
        setEditableField('');
        const arr =[];

        if(
            currentDepartment.depName === depName &&
            currentDepartment.depDefaultSkills === skills
        ) {
            return;
        }

        if(currentDepartment.depName !== depName) {
            arr.push({
                field: 'depName',
                value: depName
            });    
        }
        if(currentDepartment.depDefaultSkills !== skills) {
            arr.push({
                field: 'depDefaultSkills',
                value: skills
            });
        }

        editCurrentDepartment(id, arr);
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
                                        <Grid item className={classes.fieldName}>Department name:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'depName' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeDepName}
                                                    value={depName}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'depName' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'depName',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('depName')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartment.depName !== depName && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('depName')}
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
                                        <Grid item className={classes.fieldName}>Skills:&nbsp;&nbsp;</Grid>
                                        <Grid item xs={12} sm={9} container justify="flex-start" alignItems="center">
                                            <Grid item xs={9}>
                                                <TextField
                                                    required
                                                    disabled={editableField === 'skills' ? false : true}
                                                    margin="dense"
                                                    onChange={handleChangeSkills}
                                                    value={skills}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {editableField === 'skills' ?
                                                    <span
                                                        className={classnames({
                                                            [classes.editButton]: true,
                                                            [classes.editButtonActive]: editableField === 'skills',
                                                        })}
                                                        onClick={handleSaveField}
                                                    >
                                                        Save
                                                    </span> :
                                                    <span
                                                        className={classes.editButton}
                                                        onClick={handleEditField('skills')}
                                                    >
                                                        Edit
                                                    </span>
                                                }
                                                {
                                                    currentDepartment.depDefaultSkills !== skills && 
                                                        <span
                                                            className={classnames({
                                                                [classes.editButton]: true,
                                                                [classes.cancelEditButton]: true
                                                            })}
                                                            onClick={handleCancelEditField('skills')}
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


DepartmentAdminProfile.propTypes = propTypes;

export default DepartmentAdminProfile;