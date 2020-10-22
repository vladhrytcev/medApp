import React from "react";
import { func, object } from 'prop-types';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import AdornedButton from '../../components/CustomAdornedButton';
import { authSignIn } from '../../redux/actions/auth';
import { EMAIL_PATTERN } from '../../constants/common';



const propTypes = {
  authSignIn: func,
  auth: object,
  local: object
};


const SubmitButton = styled(AdornedButton)(spacing);
const Button = styled(MuiButton)(spacing);

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

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${props => props.theme.spacing(5)}px;
`;

const ErrorMessage = styled(Typography)`
  color: ${props => props.theme.palette.error.main}
`;





function SignIn({ auth, local, authSignIn }) {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setEmailValid] = React.useState(true);

  const { t, i18n } = useTranslation();


  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  }

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  }
  
  const handleSendSignIn = (e) => {
    e.preventDefault();
    if(!email || !password) return;

    const rule = EMAIL_PATTERN.test(email);
    if (rule){
      setEmailValid(true); 
    } else {
      setEmailValid(false);
      return;
    }

    authSignIn(email, password);
  }
  
  
  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        {t('auth.Welcome_back!')}
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        {t('auth.Sign_in_to_your_account_to_continue')}
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">{t('auth.Email_Address')}</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
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
        </FormControl>
        <SubmitButton
          fullWidth
          variant="contained"
          color="primary"
          mb={2}
          loading={auth.isLoading}
          onClick={handleSendSignIn}
        >
          {t('auth.Sign_In')}
        </SubmitButton>
        <Button
          component={Link}
          to={`/${local.language}/auth/reset-password`}
          fullWidth
          color="primary"
        >
          {t('auth.Forgot_password')}
        </Button>
      </form>
      <NavLinkWrapper component="h2" variant="body1" align="center">
        {t('auth.You_dont_have_account_yet,_please')} <NavLink to={`/${local.language}/auth/sign-up`}>{t('auth.Sign_Up')}</NavLink>
      </NavLinkWrapper>
      {!isEmpty(auth.error) && <ErrorMessage component="h2" variant="body1" align="center">
        {auth.error.message}
      </ErrorMessage>}
      {!isEmailValid && <ErrorMessage component="h2" variant="body1" align="center">
        {t('auth.Email_is_not_valid')}
      </ErrorMessage>}
    </Wrapper>
  );
}


SignIn.propTypes = propTypes;


const mapStateToProps = (state) =>({
  local : state.local,
  auth : state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authSignIn: bindActionCreators(authSignIn, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
