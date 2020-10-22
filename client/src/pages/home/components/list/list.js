import React from 'react';
import { StyledList } from './list.style';

export const List = ({ children, ...rest }) => {
  return (
    <StyledList className="common-list">
      {React.Children.map(children, (child) => (
        <li className="common-list__item">{child}</li>
      ))}
    </StyledList>
  );
}
