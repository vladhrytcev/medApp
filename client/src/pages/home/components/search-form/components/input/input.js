import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InputWrapper } from './input.style';

export const Input = ({ className, name, type, value, placeholder, isReadOnly, onChange, onClick, isInvalid, error }) => {
  console.log(isInvalid)
  const classes = classNames({
    [className]: true
  });

  return (
    <InputWrapper className={classes}>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={isReadOnly}
        onChange={onChange}
        onClick={onClick}
        className={isInvalid ? "not-valid" : null}
      />
      <span className={isInvalid ? "input-label" : "hidden-input-label"}>{error}</span>
    </InputWrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

Input.defaultProps = {
  className: '',
  type: 'text',
  isReadOnly: false,
  onClick: null
}
