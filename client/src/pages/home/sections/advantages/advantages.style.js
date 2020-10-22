import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const AdvantagesContainer = styled.div`
  padding: 140px 0 160px;
  @media (max-width: ${values.md}px) {
    padding: 140px 20px 160px;
  }
  @media (max-width: ${values.sm}px) {
    margin: 0 -24px;
  }
`;

export const AdvantagesList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: ${values.md}px) {
    flex-direction: column;
  }
`;

export const AdvantagesItem = styled.li`
  width: 100%;
  max-width: 385px;
  box-sizing: border-box;
  padding: 0 65px;
  @media (max-width: ${values.md}px) {
    max-width: 100%;
    border: none;
    display: flex;
    padding: 0;
    margin-bottom: 48px;
  }
  @media (max-width: ${values.sm}px) {
    display: block;
  }

  :not(:last-child) {
    border-right: 1px solid #e3e5e8;
    @media (max-width: ${values.md}px) {
      border: none;
      display: flex;
      padding: 0;
    }
    @media (max-width: ${values.sm}px) {
      display: block;
    }
  }
`;

export const advantagesStyles = makeStyles(theme => ({
  title: {
    maxWidth: 460,
    margin: '0 auto',
    marginBottom: '1.9em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.5rem'
    },
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.25rem'
    }
  },
  itemImage: {
    display: 'block',
    width: 'auto',
    height: 108,
    margin: '0 auto',
    marginBottom: 35
  },
  itemTitle: {
    lineHeight: '1.2728em',
    textAlign: 'center',
    letterSpacing: '-0.38px',
    [`@media (max-width: ${values.md}px)`]: {
      textAlign: 'left',
      fontSize: '1.5rem',
      lineHeight: '1.08em',
      letterSpacing: '-0.74px',
    },
    [`@media (max-width: ${values.sm}px)`]: {
      textAlign: 'center',
      fontSize: '1.375rem'
    }
  },
  itemTextBlock: {
    [`@media (max-width: ${values.md}px)`]: {
      marginLeft: 50
    },
    [`@media (max-width: ${values.sm}px)`]: {
      marginLeft: 0
    }
  },
  itemText: {
    marginTop: '1.125em',
    fontFamily: 'OpenSans',
    fontSize: '1rem',
    textAlign: 'center',
    color: theme.colors.textSecondary,
    [`@media (max-width: ${values.md}px)`]: {
      textAlign: 'left'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      textAlign: 'center',
    }
  }
}));
