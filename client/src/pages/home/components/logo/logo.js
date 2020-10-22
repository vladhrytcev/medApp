import React from 'react';

import { StyledImg } from './logo.style';
import logo from './source/logo-medlink-rgb.svg';
import logoSmall from './source/logo-medlink-small.svg';

export const Logo = ({ ...rest }) => {
  return <StyledImg src={logo} width="170" height="32" alt='' {...rest} />
};

export const LogoSmall = ({ ...rest }) => {
  return <StyledImg src={logoSmall} width="36" height="28" alt='' {...rest} />
};
