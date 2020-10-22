import styled from 'styled-components';
import { Container } from '@material-ui/core';

export const StyledContainer = styled(Container)`
  &.MuiContainer-root {
    padding: 0 32px;

    @media(max-width: 768px) {
      padding: 0 40px;
    }

    @media(max-width: 320px) {
      padding: 0 16px;
    }
  }
`;
