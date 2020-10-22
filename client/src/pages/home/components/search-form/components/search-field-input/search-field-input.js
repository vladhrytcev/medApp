import React from 'react';
import PropTypes from 'prop-types';
import { InputWrapper, StyledLabel, StyledInput, StyledList } from './search-field-input.style';
import { useAutocomplete } from '@material-ui/lab';

export const SearchFieldInput = ({ id, label, value, placeholder, autocompleteList, onChange }) => {

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id,
    inputValue: value,
    options: autocompleteList,
    freeSolo: true,
    selectOnFocus: true,
    onInputChange: (event, value) => onChange(value),
    getOptionLabel: (option) => option,
  });

  return (
    <InputWrapper {...getRootProps()}>
      <StyledLabel {...getInputLabelProps()}>{label}</StyledLabel>
      <StyledInput {...getInputProps()} placeholder={placeholder} />
      {
        groupedOptions.length > 0 ? (
          <StyledList {...getListboxProps()}>
            {
              groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option}</li>
              ))
            }
          </StyledList>
        ) : null
      }
    </InputWrapper>
  );
}

SearchFieldInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autocompleteList: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
}

SearchFieldInput.defaultProps = {
  autocompleteList: []
}
