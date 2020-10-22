import React from "react";
import { func, object } from 'prop-types';
import styled from "styled-components";
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import { EMAIL_PATTERN } from '../../../constants/common';

import {
  SubmitButton,
  Button,
  Wrapper,
  ErrorMessage
} from './styledComponent';



const propTypes = {
  invitePerson: func,
adminPersonPannel: object,
  local: object
};



function AddUserForm({ adminPersonPannel, local, invitePerson }) {
  
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setEmailValid] = React.useState(true);

  const { t, i18n } = useTranslation();


  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  }
  
  const handleSendIvitation = (e) => {
    e.preventDefault();
    if(!email) return;

    const rule = EMAIL_PATTERN.test(email);
    if (rule){
      setEmailValid(true); 
    } else {
      setEmailValid(false);
      return;
    }

    invitePerson(email);
  }
  
  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Invite new person
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeEmail}
            value={email}
          />
        </FormControl>
        <SubmitButton
          fullWidth
          variant="contained"
          color="primary"
          mb={2}
          loading={adminPersonPannel.isLoading}
          onClick={handleSendIvitation}
        >
          Send
        </SubmitButton>
      </form>
      {!isEmpty(adminPersonPannel.error) && <ErrorMessage component="h2" variant="body1" align="center">
        {adminPersonPannel.error.message}
      </ErrorMessage>}
      {!isEmailValid && <ErrorMessage component="h2" variant="body1" align="center">
        Email is not valid
      </ErrorMessage>}
    </Wrapper>
  );
}


AddUserForm.propTypes = propTypes;


export default AddUserForm;