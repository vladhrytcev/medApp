import React from 'react';
import { StyledMain } from './main.style';

export const Main = ({ children, ...rest }) => {
  return (
    <StyledMain role='main' {...rest} >
      {children}
    </StyledMain>
  );
};
