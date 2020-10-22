import { makeStyles } from '@material-ui/core/styles';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const titleStyles = makeStyles(theme => ({
  pageTitle: {
    ...theme.typography.h1,
    maxWidth: '800px',
    margin: '0 auto 90px',
    lineHeight: '64px',
    textAlign: 'center',
    [`@media (max-width: ${values.md}px)`]: {
      margin: '-50px auto 70px',
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: '-0.74px'
    },
    [`@media (max-width: ${values.sm}px)`]: {
      width: 288,
      margin: '-90px auto 44px',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.55px'
    },
  }
}));
