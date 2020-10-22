import React from 'react';
import PropTypes from 'prop-types';
import { StyledSection } from './section.style';

export const Section = ({ children, bgColor, ...rest }) => {
  return (
    <StyledSection bgColor={bgColor} {...rest}>
      {children}
    </StyledSection>
  );
};

Section.propTypes = {
  bgColor: PropTypes.string
};

Section.defaultProps = {
  bgColor: 'transparent'
};
