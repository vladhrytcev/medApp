import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const OurNetworkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 128px 136px 128px;
  @media (max-width: ${values.md}px) {
    flex-direction: column-reverse;
    padding: 0;
	margin-top: 0px !important;
    margin: 0 8px;
  }
  @media (max-width: ${values.sm}px) {
    margin: 0 -24px;
  }
`;

export const OurNetworkTextContainer = styled.div`
  width: 100%;
  max-width: 440px;
  text-align: left;
  @media (max-width: ${values.md}px) {
    max-width: 100%;
  }
`;

export const OurNetworkImageContainer = styled.div`
  width: 100%;
  max-width: 544px;

  img {
    display: block;
    width: 100%;
    object-fit: cover;
    @media (max-width: ${values.md}px) {
      width: 90%;
      object-fit: contain;
      margin: 0 auto;
	  padding-bottom: 50px;
    }
    @media (max-width: ${values.sm}px) {
      width: 90%;
      object-fit: contain;
      margin: 0 auto;
	  padding-bottom: 20px;
    }

  }
`;

export const ourNetworkStyles = makeStyles(theme => ({
  title: {
    marginBottom: '0.5em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
    [`@media (max-width: ${values.md}px)`]: {
      fontSize: '2.5rem'
    }
  },
  text: {
    fontFamily: 'OpenSans',
    fontSize: 'inherit',
    lineHeight: '1.5556em',
    color: theme.colors.textSecondary
  },
  listView: {
	paddingTop: 0,
	paddingBottom: 0,
	listStylePosition: 'inside',
	display: 'list-item',
	listStyleType: 'none',
	'&:before' : {
	  content: '"\\2022"',
	  color: theme.colors.textSecondary,
	  fontWeight: 'bold',
	  display: 'inline-block',
	  width: '1em',
	  marginLeft: '-1em'
	}
  },
  listItem: {
	fontFamily: 'OpenSans',
    fontSize: 'inherit',
	lineHeight: '1.5556em',
	fontWeight: '400',
	fontSize: '16px',
	color: theme.colors.textSecondary,
	paddingTop: '16px'
  }
}));
