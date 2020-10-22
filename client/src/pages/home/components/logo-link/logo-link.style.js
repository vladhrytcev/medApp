import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLogoLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &.active {
    cursor: default;
  }
`;
