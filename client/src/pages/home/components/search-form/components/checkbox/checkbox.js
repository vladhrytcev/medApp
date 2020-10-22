import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CheckboxWrapper } from './checkbox.style';

export const Checkbox = ({ className, name, isChecked, children, onChange }) => {
  const classes = classNames({
    [className]: true
  });

  return (
    <CheckboxWrapper className={classes}>
      <input className="check__input" type="checkbox" id={name} name={name} checked={isChecked} onChange={onChange} />
      <span className="check__box" />
      {children}
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  className: '',
  isChecked: false
}
