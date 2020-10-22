import styled from "styled-components";

import {
  Card as MuiCard,
  Typography as MuiTypography,
  Divider as MuiDivider,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";



export const Divider = styled(MuiDivider)`
    margin: 10px 0 20px!important;
`;

export const Typography = styled(MuiTypography)(spacing);


export const Card = styled(MuiCard)`
  background: ${props => props.background};
  color: ${props => props.color};
  margin-bottom: ${props => props.theme.spacing(3)}px;
  height: 180px;

  &>div {
    width: 90%;
    height: inherit;
    margin: 0 auto;
  }
`;

export const IconWrapper = styled.div`
  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.color};
  }
`;