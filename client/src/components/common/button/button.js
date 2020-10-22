import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './button.style';

export const Button = ({ label, variant, onClick, disabled, ...rest }) => {
  return (
    <StyledButton variant={variant} onClick={onClick} disabled={disabled} {...rest}>
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  variant: "contained"
}
