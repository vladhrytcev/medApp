import React from "react";
import { func, object, string } from 'prop-types';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonsSet from './ButtonsSet';



const propTypes = {
    skills: string,
    handleChangeSkills: func,
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


function SkillsInfo({
    skills,
    handleChangeSkills,
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
                    Personal info:
                </Typography>
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
                            <ButtonsSet
                                currentUser={currentUser}
                                editableField={editableField}
                                currentField={['skills']}
                                handleSaveField={handleSaveField}
                                handleEditField={handleEditField}
                                handleCancelEditField={handleCancelEditField}
                                value={skills}
                            />
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
        </>
    );
}


SkillsInfo.propTypes = propTypes;

export default SkillsInfo;