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



const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '50%',
        '@media (max-width: 699px)': {
            width: '100%'
        }
    },
}));

const propTypes = {
    addNewDepartment: func
};


function AddDepartmentForm({
    addNewDepartment,
}) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [departmentName, setDepartmentName] = React.useState('');
    const [skills, setSkills] = React.useState('');


    const handleChangeDepartmentName = (e) => {
        const value = e.target.value;
        setDepartmentName(value);
    }

    const handleChangeSkills = (e) => {
        const value = e.target.value;
        setSkills(value);
    }


    const handleSubmitContact = (e) => {
        e.preventDefault();
        if(
            !departmentName ||
            !skills
        ) {
            return;
        }

        addNewDepartment(departmentName, skills);
    
        setDepartmentName('');
        setSkills('');
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
                                    label="Department Name"
                                    placeholder="Department Name"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeDepartmentName}
                                    value={departmentName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Skills"
                                    placeholder="Skills"
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeSkills}
                                    value={skills}
                                    fullWidth
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
  
AddDepartmentForm.propTypes = propTypes;
  
export default AddDepartmentForm;