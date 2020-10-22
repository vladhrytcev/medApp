import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints

export const StaffContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 128px 160px;
  @media (max-width: ${values.md}px) {
    flex-direction: column;
    padding: 0 0 130px;
    margin: 0 -9px;
  }

  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    padding: 0 0 73px;
    margin: 0 -24px;
  }

  .staff__image {
    max-width: 544px;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .staff__image-mobile {
    display: none;
  }

  .staff__image-tablet {
    display: none;
  }

  @media (max-width: ${values.md}px) {
    .staff__image {
      display: none;
    }
    .staff__image-mobile {
      display: none;
    }
    .staff__image-tablet {
      display: block;
      width: 100%;
      img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }

  @media (max-width: ${values.sm}px) {
    .staff__image {
      display: none;
    }
    .staff__image-tablet {
      display: none;
    }
    .staff__image-mobile {
      display: block;
      width: 100%;
      img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }

  .staff__text {
    max-width: 448px;
    margin-left: 128px;
    @media (max-width: ${values.md}px) {
      max-width: 100%;
      margin-top: 40px;
      margin-left: 0;
    }
    @media (max-width: ${values.sm}px) {
      margin-top: 28px;
      margin-left: 0;
    }
  }
`;

export const staffStyles = makeStyles(theme => ({
  title: {
    marginBottom: '0.5em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: -0.74
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: -0.64
    }
    
  },
  text: {
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    color: theme.colors.textSecondary,
    [`@media (max-width: ${values.md}px)`]: {
      lineHeight: 1.63,
      color: '#333c4d'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      lineHeight: 1.63,
      color: '#333c4d'
    }
  }
}));
