import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Calendar } from '../calendar';
import { Button } from '../../../common';
import { CalendarFormWrapper } from './calendar-form.style';
import { NotDesktopContactForm } from '../../../../service/mediaQuery';
import { CloseButton } from '../close-button';
import { Input } from '../input';


export const CalendarForm = ({ className, months, ranges, inputValue, onChange, onSave, onClear, onClose }) => {
  const classes = classNames(className);

  return (
    <CalendarFormWrapper className={classes}>
      <NotDesktopContactForm>
        <CloseButton className="calendar-form__close-btn" onClick={onClose} />
        <Input className="calendar-form__input" type='text' value={inputValue} isReadOnly={true} />
      </NotDesktopContactForm>
      <Calendar className="calendar-form__calendar" ranges={ranges} onChange={onChange} months={months} />
      <div className="calendar-form__controls">
        <Button classes="calendar-form__controls-clear-btn" label="Clear" variant="text" onClick={onClear} />
        <Button classes="calendar-form__controls-save-btn" label="Save" onClick={onSave} />
      </div>
    </CalendarFormWrapper>
  );
};

CalendarForm.propTypes = {
  className: PropTypes.string,
  months: PropTypes.number,
  ranges: PropTypes.array,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  oClear: PropTypes.func
}
