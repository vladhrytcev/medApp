import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;
  width: 100%;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function ResetPassword() {
  const { t, i18n } = useTranslation();

  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        {t('auth.Reset_password')}
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        {t('auth.Enter_your_email_to_reset_your_password')}
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">{t('auth.Email_Address')}</InputLabel>
          <Input id="email" name="email" autoComplete="email" autoFocus />
        </FormControl>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
        >
          {t('auth.Reset_password')}
        </Button>
      </form>
    </Wrapper>
  );
}

export default ResetPassword;
