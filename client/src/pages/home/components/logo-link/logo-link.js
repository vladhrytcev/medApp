import React from 'react';
import { Logo } from '../logo';
import { StyledLogoLink } from './logo-link.style';

export const LogoLink = ({ ...rest }) => {
  return (
    <StyledLogoLink {...rest}>
      <Logo />
    </StyledLogoLink>
  );
};
