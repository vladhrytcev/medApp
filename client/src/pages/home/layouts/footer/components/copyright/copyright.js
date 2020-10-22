import React from 'react';

export const Copyright = ({ ...rest }) => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <span {...rest}>{`©MedLink Copyright ${year}`}</span>
  );
}
