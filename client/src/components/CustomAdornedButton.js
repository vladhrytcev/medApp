import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';



const styles = {
  root: {
    marginLeft: 15,
    color: '#fff'
  }
};


const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.root}
    size={20}
  />
));


const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props;

  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
};

export default AdornedButton;