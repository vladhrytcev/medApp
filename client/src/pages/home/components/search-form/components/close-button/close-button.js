import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { StyledButton } from './close-button.style';

export const CloseButton = ({ className, onClick }) => {
  const classes = classNames({
    [className]: true
  })

  return (
    <StyledButton className={classes} type="button" onClick={onClick}>
      Close
    </StyledButton>
  );
};

CloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

CloseButton.defaultProps = {
  className: ''
}
