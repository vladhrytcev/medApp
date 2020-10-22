import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const FindOutMoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 160px 128px;
  @media (max-width: ${values.md}px) {
    padding: 160px 0;
  }

  .find-out-more__image {
    width: 100%;
    min-width: 320px;
    max-width: 544px;
    @media (max-width: ${values.md}px) {
      max-width: 288px;
    }
    @media (max-width: ${values.sm}px) {
      max-width: 100%;
    }


    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .find-out-more__text {
    max-width: 100%;
    margin-left: 126px;
    @media (max-width: ${values.md}px) {
      margin: 0 auto;
      padding-left: 70px;
    }
    @media (max-width: ${values.sm}px) {
      padding-left: 0;
      margin-left: 0;
    }
  },
  @media (max-width: ${values.md}px) {
    padding: 90px 8px;
  }
  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    padding: 15px 0 90px;
    margin: 0 -20px;
  }
`;

export const findOutMoreStyles = makeStyles(theme => ({
  title: {
    marginBottom: '0.5em',
    lineHeight: 1.08,
    letterSpacing: -1,
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.25rem'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '2rem',
      padding: '40px 0 10px',
      lineHeight: 1.25,
      letterSpacing: -0.64
    }
  },
  text: {
    marginBottom: '2.5em',
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    lineHeight: 1.56,
    color: theme.colors.textSecondary,
    [`@media (max-width: ${values.sm}px)`]: {
      color: '333c4d',
      fontSize: '1rem'
    }
  }
}));
