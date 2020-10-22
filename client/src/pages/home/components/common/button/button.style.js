import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

const StyledButton = styled(Button)`
  &.MuiButton-root {
    min-width: auto;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: 1em;
    color: inherit;
    background-color: transparent;
    border: none;
    border-radius: 0;
    transition-property: background-color, color;

    &:hover,
    &:focus {
      background-color: transparent;
      ${({ theme }) => `
        color: ${theme.colors.brandPrimary};
      `}
    }

    &.MuiButton-contained {
      padding: 1rem 1.375rem;
      padding-bottom: 0.875rem;
      border-radius: 6px;
      ${({ theme }) => `
        color: ${theme.colors.textInvert};
        background-color: ${theme.colors.brandPrimary};
      `}

      &:hover,
      &:focus {
        background-color: #5978e3;
      }

      &.MuiButton-sizeLarge {
        padding: 1.5rem 2.625rem;
        padding-bottom: 1.375rem;
      }
    }
  }

`;

export default withTheme(StyledButton);
