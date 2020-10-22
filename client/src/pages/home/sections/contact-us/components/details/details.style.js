import styled from "styled-components";
import { withTheme } from '@material-ui/core/styles';

const StyledDetailItem = styled.div`
  margin-bottom: 4.125rem;
  @media (max-width: 959px) {
    margin-right: 125px;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  h3 {
    margin: 0;
    margin-bottom: 1em;
    font-size: 0.9375rem;
    line-height: 1em;
    text-transform: uppercase;
    opacity: 0.5;
  }

  a {
    display: inline-block;
    font-size: 1.375rem;
    line-height: 1em;
    letter-spacing: -0.39px;
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      ${({ theme }) => `
        color: ${theme.colors.brandPrimary};
      `}
    }
  }
`;

export const DetailItem = withTheme(StyledDetailItem);
