import React from "react";
import { useTranslation } from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';


import {
    ContactFieldWrapper,
    TypographyHeader,
    TypographyTextWrapper,
    TypographyText,
    ContactFace,
    CallIcon,
    FormTextField,
    ContactForm,
    FormFieldWrapper,
} from './styledComponent.js';

import { SendRequestButton } from '../globalLandingStyles.js';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'url(/static/img/background/contactBackground.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    },
    selectTextField: {
        textAlign: 'left'
    },
    textFieldbg: {
        backgroundColor: "white"
    }
}));


function ContactField(opt) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [organizationName, setOrganizationName] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [message, setMessage] = React.useState('');


    const handleChangeOrganizationName = (e) => {
        const value = e.target.value;
        setOrganizationName(value);
    }

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const handleChangeFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleChangeLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handleChangePhone = (e) => {
        const value = e.target.value;
        setPhone(value);
    }

    const handleChangeMessage = (e) => {
        const value = e.target.value;
        setMessage(value);
    }

    const handleSubmitContact = (e) => {
        e.preventDefault();

        setOrganizationName('');
        setTitle('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
    }

    return (
        <div className={classes.root}>
            <ContactFieldWrapper>
                <TypographyHeader variant="h1" gutterBottom>{t('global.contact.header')}</TypographyHeader>
                <TypographyTextWrapper>
                    <TypographyText variant="h6">
                        {t('global.contact.sub')}
                    </TypographyText>
                </TypographyTextWrapper>

                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <CallIcon />
                            </Grid>
                            <Grid item>
                                <Box textAlign="center" color="#2c57a9">{t('global.contact.call_me')}</Box>
                                <TypographyText variant="h5">{t('global.phone')}</TypographyText>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ContactFace>
                            <img src={`/static/img/background/contactFace.png`} />
                        </ContactFace>
                    </Grid>
                </Grid>
                <ContactForm onSubmit={handleSubmitContact}>
                    <TypographyHeader variant="h2" gutterBottom>{t('global.contact.form.' + opt.type + '.header')}</TypographyHeader>
                    <FormFieldWrapper>
                        <Grid container justify="space-between" alignItems="center" spacing={1}>
                            <Grid item xs={12}>
                                <FormTextField
                                    label={t('global.contact.form.' + opt.type + '.label')}
                                    placeholder={t('global.contact.form.' + opt.type + '.label')}
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeOrganizationName}
                                    value={organizationName}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormTextField
                                    label={t('global.contact.form.title')}
                                    placeholder={t('global.contact.form.title')}
                                    variant="outlined"
                                    margin="dense"
                                    onChange={handleChangeTitle}
                                    value={title}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormTextField
                                    label={t('global.contact.form.firstname')}
                                    placeholder={t('global.contact.form.firstname')}
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeFirstName}
                                    value={firstName}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormTextField
                                    label={t('global.contact.form.lastname')}
                                    placeholder={t('global.contact.form.lastname')}
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeLastName}
                                    value={lastName}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <FormTextField
                                    label={t('global.contact.form.email')}
                                    placeholder={t('global.contact.form.email')}
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangeEmail}
                                    value={email}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormTextField
                                    label={t('global.contact.form.contact')}
                                    placeholder={t('global.contact.form.contact')}
                                    variant="outlined"
                                    required
                                    margin="dense"
                                    onChange={handleChangePhone}
                                    value={phone}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    label={t('global.contact.form.message')}
                                    placeholder={t('global.contact.form.message')}
                                    variant="outlined"
                                    margin="dense"
                                    multiline
                                    rows="4"
                                    onChange={handleChangeMessage}
                                    value={message}
                                    className={classes.textFieldbg}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label={
                                        <FormHelperText>
                                            {t('global.contact.form.agree')}
                                        </FormHelperText>
                                    }
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormHelperText id="my-helper-text">{t('global.contact.form.agree2')}</FormHelperText>
                            </Grid>
                        </Grid>
                    </FormFieldWrapper>
                    <SendRequestButton type="submit">{t('global.contact.form.send')}</SendRequestButton>
                </ContactForm>
            </ContactFieldWrapper>
        </div>
    );
}


export default ContactField;