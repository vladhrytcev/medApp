import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const FeatureContainer = styled.div`
  padding: 140px 0 150px;
`;

export const FeatureList = styled.ul`
  display:flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: ${values.md}px) {
    flex-direction: column;
  }
  @media (max-width: ${values.sm}px) {
    flex-direction: column;
  }
`;

export const FeatureItem = styled.li`
  width: 100%;
  max-width: 385px;
  padding: 0 65px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  
  &:not(:last-child) {
    border-right: 1px solid #e3e5e8;
  }
  @media (max-width: ${values.md}px) {
    flex-direction: row;
    max-width: 959px;
    padding: 25px 33px;
    border-style: none !important;
    .content-container {
      margin-left: 25px;
    }
  }
  @media (max-width: ${values.sm}px) {
    flex-direction: column !important;
    border-style: none !important;
    padding: 0;
    margin-bottom: 56px;
    margin: 0 auto;
    .content-container {
      margin-bottom: 56px;
      margin-left: 0;
    }
  }
`;

export const featureStyles = makeStyles(theme => ({
  featureTitle: {
    margin: '0 auto',
    maxWidth: 460,
    marginBottom: '1.9em',
    lineHeight: 1.08,
    letterSpacing: -1,
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.25rem',
      width: 'auto'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '2rem',
      width: 'auto'
    },
  },
  featureItemImg: {
    display: 'block',
    width: 'auto',
    height: 105,
    objectFit: 'cover',
    margin: '0 auto',
    marginBottom: 30,
    [`@media (max-width: ${values.md}px)`]: {
      width: 85,
      height: 'auto'
    }
  },
  featureItemTitle: {
    marginBottom: 18,
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      textAlign: 'left',
      fontSize: '1.35rem'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      textAlign: 'center',
      fontSize: '1.3rem'
    }
  },
  featureItemText: {
    fontFamily: 'OpenSans',
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: '1.625em',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      textAlign: 'left',
      fontFamily: 'OpenSans',
      fontSize: '1rem',
      color: '#333c4d'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      textAlign: 'center'
    }
  }
}));
