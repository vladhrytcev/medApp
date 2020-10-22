import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const OurPromiseContainer = styled.div`
  padding: 140px 128px 160px;
  @media (max-width: ${values.md}px) {
    padding: 140px 10px 160px;
    margin: 0 -24px;
  }
`;

export const PromiseRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    align-items: start;
  }

  :not(:last-of-type) {
    margin-bottom: 112px;
  }

  &.revert {
    flex-direction: row-reverse;
    @media (max-width: ${values.sm}px) {
      flex-direction: column;
    } 

    .promise__text {
      padding-left: 64px;
      padding-right: 96px;
      @media (max-width: ${values.sm}px) {
        padding: 0;
      }  
    }
  }

  .promise__main-img {
    width: 100%;
    max-width: 328px;
    @media (max-width: ${values.sm}px) {
      max-width: 768px;
    }

    img {
      display: block;
      width: 100%;
      object-fit: cover;
      @media (max-width: ${values.sm}px) {
        height: auto;
      }
    }
  }

  .promise__text {
    max-width: 544px;
    padding-left: 96px;
    padding-right: 64px;
    box-sizing: border-box;
    @media (max-width: ${values.sm}px) {
      margin-top: 19px;
      padding: 0;
    }

    img {
      display: block;
      width: auto;
      height: 50px;
      object-fit: cover;
      margin-right: auto;
      margin-bottom: 25px;
    }
  }

`;

export const ourPromiseStyles = makeStyles(theme => ({
  title: {
    maxWidth: 448,
    margin: '0 auto',
    marginBottom: '0.5em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
    textAlign: 'center'
  },
  subtitle: {
    maxWidth: 536,
    margin: '0 auto',
    marginBottom: '5em',
    fontFamily: 'OpenSans',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 'inherit',
    lineHeight: '1.5556em',
    textAlign: 'center',
    color: theme.colors.textSecondary
  },
  itemTitle: {
    marginBottom: '0.5em',
    fontSize: '2.25rem',
    lineHeight: '1.1111em',
    letterSpacing: '-0.63px',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '1.75rem',
    }
  },
  itemText: {
    fontFamily: 'OpenSans',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1rem',
    lineHeight: '1.625em',
    color: theme.colors.textSecondary
  }
}));
