import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const agbStyles = makeStyles(theme => ({
  main: {
    padding: '0 12px',
	[theme.breakpoints.up('sm')]: {
		padding: '0 52px'
	},
	[theme.breakpoints.up('md')]: {
		padding: '0 120px'
	}
  },
  topList: {
	fontFamily: 'Gilroy !important',
	fontSize: '14px',
	fontWeight: '600',
	fontStretch: 'normal',
	fontStyle: 'normal',
	lineHeight: 'normal !important',
	letterSpacing: 'normal',
	[theme.breakpoints.up('sm')]: {
		fontSize: '18px'
	},
  },
  text: {
	fontFamily: 'OpenSans',
	fontSize: '10px',
	fontWeight: 'normal',
	fontStretch: 'normal',
	fontStyle: 'normal',
	margin: '1em 1em',
	[theme.breakpoints.up('sm')]: {
		fontSize: '14px'
	},
  },
  ol: {
	paddingInlineStart: '3px',
	[theme.breakpoints.up('sm')]: {
	  paddingInlineStart: '40px'
	},
  },
  olTop: {
	listStyle: 'none',
	counterReset: 'myCounter',
	paddingInlineStart: '12px',
	'& > li' :{
		counterIncrement: 'myCounter'
	},
	'& > li::before' :{
		content: "'§ ' counter(myCounter) '. '",
		fontWeight: '600'
	},
	[theme.breakpoints.up('sm')]: {
	  paddingInlineStart: '40px'
	},
  }
}));
