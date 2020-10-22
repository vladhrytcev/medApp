import React from "react";
import { func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { EMAIL_PATTERN } from '../../../constants/common';
import PersonalInfo from './PersonalInfo';
import AddressInfo from './AddressInfo';
import QualificationInfo from './QualificationInfo';
import AgenciesInfo from './AgenciesInfo';
import EducationInfo from './EducationInfo';
import SkillsInfo from './SkillsInfo';
import PreferenciesInfo from './PreferenciesInfo';
import JobsInfo from './JobsInfo';

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


function PersonUserProfile({
    currentUser,
    local,
    editCurrentUser
}) {  
    
    const classes = useStyles();

    const [email, setEmail] = React.useState(() => currentUser.email);
    const [firstName, setFirstName] = React.useState(() => currentUser.firstName);
    const [lastName, setLastName] = React.useState(() => currentUser.lastName);
    const [contact, setContact] = React.useState(() => currentUser.contact);
    const [address, setAddress] = React.useState(() => currentUser.address);
    const [postcode, setPostcode] = React.useState(() => currentUser.postcode);
    const [city, setCity] = React.useState(() => currentUser.city);
    const [qualificationType, setQualificationType] = React.useState(() => currentUser.qualification.level.type);
    const [qualificationAdd, setQualificationAdd] = React.useState(() => currentUser.qualification.additionalInfo.type);
    const [skills, setSkills] = React.useState(() => currentUser.skills.join(', '));
    const [distance, setDistance] = React.useState(() => currentUser.preferences.distance);
    const [minSalary, setMinSalary] = React.useState(() => currentUser.preferences.minSalary);
    const [jobType, setJobType] = React.useState(() => currentUser.preferences.jobType.join(', '));
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

    const handleChangeAddress = (e) => {
        const value = e.target.value;
        setAddress(value);
    }

    const handleChangePostcode = (e) => {
        const value = e.target.value;
        setPostcode(value);
    }
    const handleChangeCity = (e) => {
        const value = e.target.value;
        setCity(value);
    }

    const handleChangeQualificationType = (e) => {
        const value = e.target.value;
        setQualificationType(value);
    }

    const handleChangeQualificationAdd = (e) => {
        const value = e.target.value;
        setQualificationAdd(value);
    }

    const handleChangeSkills = (e) => {
        const value = e.target.value;
        setSkills(value);
    }

    const handleChangeDistance = (e) => {
        const value = e.target.value;
        setDistance(value);
    }

    const handleChangeMinSalary = (e) => {
        const value = e.target.value;
        setMinSalary(value);
    }

    const handleChangeJobType = (e) => {
        const value = e.target.value;
        setJobType(value);
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
            case 'address':
                setAddress(currentUser.address);
                break;
            case 'postcode':
                setPostcode(currentUser.postcode);
                break;
            case 'city':
                setCity(currentUser.city);
                break;
            case 'qualification.level.type':
                setQualificationType(currentUser.qualification.level.type);
                break;
            case 'qualification.additionalInfo.type':
                setQualificationAdd(currentUser.qualification.additionalInfo.type);
                break;
            case 'skills':
                setSkills(currentUser.skills.join(', '));
                break;
            case 'preferences.distance':
                setDistance(currentUser.preferences.distance);
                break;
            case 'preferences.minSalary':
                setMinSalary(currentUser.preferences.minSalary);
                break;
            case 'preferences.jobType':
                setJobType(currentUser.preferences.jobType.join(', '));
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
            currentUser.contact === contact &&
            currentUser.address === address &&
            currentUser.postcode === postcode &&
            currentUser.city === city &&
            currentUser.qualification.level.type === qualificationType &&
            currentUser.qualification.additionalInfo.type === qualificationAdd &&
            currentUser.skills.join(', ') === skills &&
            currentUser.preferences.distance === distance &&
            currentUser.preferences.minSalary === minSalary &&
            currentUser.preferences.jobType.join(', ') === jobType
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
        if(currentUser.address !== address) {
            arr.push({
                field: 'address',
                value: address
            });
        }
        if(currentUser.postcode !== postcode) {
            arr.push({
                field: 'postcode',
                value: postcode
            });
        }
        if(currentUser.city !== city) {
            arr.push({
                field: 'city',
                value: city
            });
        }
        if(currentUser.qualification.level.type !== qualificationType) {
            arr.push({
                field: 'qualification.level.type',
                value: qualificationType
            });
        }
        if(currentUser.qualification.additionalInfo.type !== qualificationAdd) {
            arr.push({
                field: 'qualification.additionalInfo.type',
                value: qualificationAdd
            });
        }
        if(currentUser.skills.join(', ') !== skills) {
            arr.push({
                field: 'skills',
                value: skills.split(', ')
            });
        }
        if(currentUser.preferences.distance !== distance) {
            arr.push({
                field: 'preferences.distance',
                value: distance
            });
        }
        if(currentUser.preferences.minSalary !== minSalary) {
            arr.push({
                field: 'preferences.minSalary',
                value: minSalary
            });
        }
        if(currentUser.preferences.jobType.join(', ') !== jobType) {
            arr.push({
                field: 'preferences.jobType',
                value: jobType.split(', ')
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
                                <AddressInfo
                                    address={address}
                                    postcode={postcode}
                                    city={city}
                                    handleChangeAddress={handleChangeAddress}
                                    handleChangePostcode={handleChangePostcode}
                                    handleChangeCity={handleChangeCity}
                                    editableField={editableField}
                                    currentUser={currentUser}
                                    handleSaveField={handleSaveField}
                                    handleEditField={handleEditField}
                                    handleCancelEditField={handleCancelEditField}
                                />
                                <QualificationInfo
                                    qualificationType={qualificationType}
                                    qualificationAdd={qualificationAdd}
                                    handleChangeQualificationType={handleChangeQualificationType}
                                    handleChangeQualificationAdd={handleChangeQualificationAdd}
                                    editableField={editableField}
                                    currentUser={currentUser}
                                    handleSaveField={handleSaveField}
                                    handleEditField={handleEditField}
                                    handleCancelEditField={handleCancelEditField}
                                />
                                {
                                    !isEmpty(currentUser.agencyId) &&
                                    <AgenciesInfo
                                        currentUser={currentUser}
                                    />
                                }
                                <EducationInfo
                                    currentUser={currentUser}
                                />
                                <SkillsInfo
                                    skills={skills}
                                    handleChangeSkills={handleChangeSkills}
                                    editableField={editableField}
                                    currentUser={currentUser}
                                    handleSaveField={handleSaveField}
                                    handleEditField={handleEditField}
                                    handleCancelEditField={handleCancelEditField}
                                />
                                <PreferenciesInfo
                                    distance={distance}
                                    minSalary={minSalary}
                                    jobType={jobType}
                                    handleChangeDistance={handleChangeDistance}
                                    handleChangeMinSalary={handleChangeMinSalary}
                                    handleChangeJobType={handleChangeJobType}
                                    editableField={editableField}
                                    currentUser={currentUser}
                                    handleSaveField={handleSaveField}
                                    handleEditField={handleEditField}
                                    handleCancelEditField={handleCancelEditField}
                                />
                                {
                                    !isEmpty(currentUser.jobs) &&
                                    <JobsInfo
                                        currentUser={currentUser}
                                    />
                                }
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


PersonUserProfile.propTypes = propTypes;

export default PersonUserProfile;