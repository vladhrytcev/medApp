import React from 'react';
import { NavList, NavItem } from './nav-menu.style';

export const NavMenu = ({ children }) => {
  return (
    <NavList>
      {React.Children.map(children, (child) => (
        <NavItem>{child}</NavItem>
      ))}
    </NavList>
  );
};
