import React from 'react';
import { StyledContainer } from './section-container.style';

export const SectionContainer = ({ children, ...rest }) => {
  return (
    <StyledContainer maxWidth='xl' {...rest}>
      {children}
    </StyledContainer>
  )
};
