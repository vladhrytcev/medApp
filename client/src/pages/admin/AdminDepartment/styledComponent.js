import styled from "styled-components";
import { NavLink } from "react-router-dom";

import {
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  InputBase
} from "@material-ui/core";
import { darken } from "polished";

import { spacing } from "@material-ui/system";




export const Divider = styled(MuiDivider)`
    margin: 10px 0 20px!important;
`;

export const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export const LogoWraper = styled.div`
    width: 150px;
    height: 100px;

    &>img {
        width: 100%;
        height: 100%;
    }
`;

export const Card = styled(MuiCard)(spacing);

export const CardContent = styled(MuiCardContent)(spacing);

export const Paper = styled(MuiPaper)(spacing);

export const Spacer = styled.div`
  flex: 1 1 100%;
`;

export const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

export const RouterNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main}
`;

export const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.header.background};
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.down("sm")} {
    width: 70%;
  }
`;

export const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 160px;
  }
`;