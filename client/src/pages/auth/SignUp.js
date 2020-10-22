import React from "react";
import { func, object } from 'prop-types';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { green, yellow } from "@material-ui/core/colors";

import AdornedButton from '../../components/CustomAdornedButton';
import { authSignUp } from '../../redux/actions/auth';
import { EMAIL_PATTERN } from '../../constants/common';


const propTypes = {
  authSignUp: func,
  auth: object,
  local: object
};


const SubmitButton = styled(AdornedButton)(spacing);

const NavLink = styled(Link)`
  color: ${props => props.theme.palette.primary.main};
`;

const NavLinkWrapper = styled(Typography)`
  padding: 15px 0;
`;

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const ErrorMessage = styled(Typography)`
  color: ${props => props.theme.palette.error.main}
`;

const PasswordStrength = styled(Typography)`
  padding: 5px 0;
  color: ${props => {
    switch(props.strength) {
      case 'weak':
        return props.theme.palette.error.main
      case 'medium':
        return yellow[800]
      case 'strong':
        return green[800]
    }
  }}
`;




function SignUp({ auth, local, authSignUp }) {
  
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setEmailValid] = React.useState(true);
  const [isPasswordStrong, setPasswordStrong] = React.useState('');

  const { t, i18n } = useTranslation();

  
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

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    if(value.length<=6) {
      setPasswordStrong('weak');
    } else if(value.length>6 && value.length<=10) {
      setPasswordStrong('medium');
    } else {
      setPasswordStrong('strong');
    }
  }
  
  const handleSendSignUp = (e) => {
    e.preventDefault();

    if(
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      isPasswordStrong === 'weak'
    ) return;

    const rule = EMAIL_PATTERN.test(email);
    if (rule){
      setEmailValid(true); 
    } else {
      setEmailValid(false);
      return;
    }

    authSignUp(firstName, lastName, email, password);
  }

  const passwordStrength = () => {
    switch(isPasswordStrong) {
      case 'weak':
        return t('auth.Your_password_is_to_weak');
      case 'medium':
        return t('auth.You_password_is_not_enough_good');
      case 'strong':
        return t('auth.You_password_is_strong');
    }
  }

  const displayErrorMessage = ( msg ) => {
    if(typeof(msg) !== 'object') return msg;

    const err = msg.reduce((acc, item) => {
      const str = Object.values(item.constraints).join(', ');
      acc.push(str);
      return acc;
    }, []);

    const res = err.join(', ');
    return res;
  }
  
  
  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        {t('auth.Get_started')}
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        {t('auth.Start_creating_the_best_possible_user_experience_for_you_customers')}
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">{t('auth.First_Name')}</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            autoFocus
            onChange={handleChangeFirstName}
            value={firstName}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">{t('auth.Last_Name')}</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            onChange={handleChangeLastName}
            value={lastName}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">{t('auth.Email_Address')}</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleChangeEmail}
            value={email}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">{t('auth.Password')}</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
            value={password}
          />
          {!!password && <PasswordStrength
            strength={isPasswordStrong}
          >
            {passwordStrength()}
          </PasswordStrength>}
        </FormControl>
        <SubmitButton
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
          loading={auth.isLoading}
          onClick={handleSendSignUp}
        >
          {t('auth.Sign_Up')}
        </SubmitButton>
      </form>
      <NavLinkWrapper component="h2" variant="body1" align="center">
        {t('auth.If_you_already_have_account,_please')} <NavLink to={`/${local.language}/auth/sign-in`}>{t('auth.Sign_In')}</NavLink>
      </NavLinkWrapper>
      {!isEmpty(auth.error) && <ErrorMessage component="h2" variant="body1" align="center">
        {displayErrorMessage(auth.error.message)}
      </ErrorMessage>}
      {!isEmailValid && <ErrorMessage component="h2" variant="body1" align="center">
        {t('auth.Email_is_not_valid')}
      </ErrorMessage>}
    </Wrapper>
  );
}


SignUp.propTypes = propTypes;

const mapStateToProps = (state) =>({
  local : state.local,
  auth : state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authSignUp: bindActionCreators(authSignUp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
