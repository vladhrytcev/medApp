import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const OutcomeContainer = styled.div`
  padding: 140px 0 155px;
  @media (max-width: ${values.md}px) {
    padding: 98px 0 109px;
  }
`;

export const OutcomeList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: ${values.sm}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const OutcomeItem = styled.li`
  width: 100%;
  max-width: 382px;
  padding: 0 56px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-right: 1px solid #e3e5e8;
    @media (max-width: ${values.md}px) {
      border: none;
      margin-bottom: 59px;
    }
  }
`;

export const outcomeStyles = makeStyles(theme => ({
  title: {
    maxWidth: 520,
    margin: '0 auto',
    marginBottom: '0.5em',
    lineHeight: '1.08em',
    textAlign: 'center',
	wordWrap: 'break-word',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.333rem',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: '-0.74px',
	  textAlign: 'left'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '2.25rem',
	  textAlign: 'left'
    }
  },
  subtitle: {
    maxWidth: 740,
    margin: '0 auto',
    marginBottom: '5em',
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    lineHeight: '1.5556em',
    textAlign: 'center',
    color: theme.colors.textSecondary,
	[`@media (max-width: ${values.md}px)`]: {
	  textAlign: 'left'
    },
    [`@media (max-width: ${values.sm}px)`]: {
	  textAlign: 'left'
    }
  },
  itemImage: {
    display: 'block',
    width: 'auto',
    height: '111px',
    objectFit: 'cover',
    margin: '0 auto',
    marginBottom: 30,
  },
  itemTitle: {
    marginBottom: '0.2286em',
    fontSize: '2.1875rem',
    lineHeight: '0.8em',
    textAlign: 'center',
    letterSpacing: '-0.58px',
    [`@media (max-width: ${values.sm}px)`]: {
      fontSize: '1.667rem',
      fontWeight: 600,
      letterSpacing: '-0.54px'
    }
  },
  itemSubtitle: {
    fontSize: 'inherit',
    lineHeight: '1.5556em',
    textAlign: 'center',
    letterSpacing: '-0.2px'
  }
}));
