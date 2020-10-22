import { makeStyles } from '@material-ui/core/styles';

export const introStyles = makeStyles(theme => ({
  title: {
    margin: '0',
    marginBottom: '0.5em',
    ['@media (max-width: 768px)']: {
      fontSize: 32,
      marginBottom: 17,
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: -0.64,
      color: '#f8f8fa'
    },
    ['@media (min-width: 768px)']: {
      fontSize: 37,
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: -0.74,
      color: '#ffffff'
    },
  },
  text: {
    margin: '0',
    fontFamily: 'OpenSans, sans-serif',
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: '1.5555em',
    ['@media (max-width: 768px)']: {
      fontSize: 16,
      fontFamily: 'OpenSans',
      lineHeight: 1.63,
      color: '#f8f8fa'
    },
    ['@media (max-width: 959px)']: {
      
    }
  }
}));
