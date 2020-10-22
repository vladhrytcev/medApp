import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StyledButton from './button.style';

export const Button = ({ label, variant, onClick, disabled, classes, ...rest }) => {
  return (
    <StyledButton className={classNames(classes)} variant={variant} onClick={onClick} disabled={disabled} {...rest}>
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  variant: "contained"
}
