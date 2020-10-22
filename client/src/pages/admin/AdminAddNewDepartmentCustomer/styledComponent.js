import styled from "styled-components";

import {
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import AdornedButton from '../../../components/CustomAdornedButton';




export const Divider = styled(MuiDivider)`
    margin: 10px 0 20px!important;
`;

export const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


export const SubmitButton = styled(AdornedButton)(spacing);
export const Button = styled(MuiButton)(spacing);

export const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;
  width: 100%;
  margin: 20px auto 0;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
    width: 500px;
    margin: 50px auto 0;
  }
`;

export const ErrorMessage = styled(Typography)`
  color: ${props => props.theme.palette.error.main}
`;