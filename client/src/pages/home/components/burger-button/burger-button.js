import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StyledBurgerButton } from './burger-button.style';

export const BurgerButton = ({ isActive, onClick }) => {
  return (
    <StyledBurgerButton className={classNames('burger-button', { 'active': isActive })} onClick={onClick}>
      <span className="burger-button__box">
        <span className="burger-button__inner"></span>
      </span>
    </StyledBurgerButton>
  );
};

BurgerButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}
