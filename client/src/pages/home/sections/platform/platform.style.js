import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const PlatformContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 57px 0 150px 0;

  .platform-image {
    width: 642px;
    height: 467px;
    margin-right: 125px;
	padding-top: 47px;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    @media (max-width: ${values.md}px) {
      margin-right: 0;
	  padding-top: 0;
    }

    @media (max-width: ${values.sm}px) {
      height: 100%;
      margin-right: 0;
	  padding-top: 0;
    }
  }

  .platform-text {
    max-width: 769px;
    padding-top: 40px;
  }

  @media (max-width: ${values.md}px) {
    flex-direction: column;
    .platform-image {
      margin: 0 auto;
    }
    .platform-text {
      margin: 0 auto;
    }
  }

  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    width: 100%;
    .platform-image {
      width: 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    .platform-text {
      padding-top: 13px;
      margin: 0 -16px;
    }
  }
`;

export const platformStyles = makeStyles(theme => ({
  platformTitle: {
    marginBottom: '0.5em',
    lineHeight: '1.08em',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2rem'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '2rem',
    },
  },
  platformText: {
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    color: theme.colors.textSecondary,
    '&:not(:last-child)': {
      marginBottom: '1rem'
    },
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '1.15rem',
      color: '#333c4d'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '1rem',
      color: '#333c4d'
    },
  },
  platformSubtitle: {
    marginBottom: '0.3em',
    lineHeight: '1.08em',
    [`@media (max-width: ${values.md}px)`]: {
      display: 'none'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      display: 'none'
    }
  },
  platformImage: {
	  maxWidth: '546px',
	  maxHeight: '421px'
  }
}));
