import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const HowItWorksWrapper = styled.div`
  padding: 140px 0;
  @media (max-width: ${values.sm}px) {
    margin: 0 -20px;
  }
`;

export const HowItWorksStyles = makeStyles(theme => ({
  title: {
    maxWidth: 460,
    margin: '0 auto',
    marginBottom: '0.5em',
    lineHeight: 1.08,
    textAlign: 'center',
    letterSpacing: -1,
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.5rem',
      textAlign: 'left',
      maxWidth: 959
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: 32,
      textAlign: 'left',
    }
  },
  subtitle: {
    maxWidth: 536,
    margin: '0 auto',
    marginBottom: 97,
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    lineHeight: 1.56,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    [`@media (max-width: ${values.md}px)`]: {
      fontFamily: 'OpenSans',
      fontSize: '1rem',
      textAlign: 'left',
      width: 400,
      margin: '0 0 88px'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontFamily: 'OpenSans',
      fontSize: 16,
      textAlign: 'left',
      width: 'auto'
    }
  }
}));
