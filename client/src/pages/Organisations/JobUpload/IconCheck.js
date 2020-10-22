import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    svg: {
        width: '24px',
        height: '24px',
        padding: '4px'
      }
}));

  

function IconCheck() {
    const classes = useStyles();

    return (
      <svg className={classes.svg} viewBox="0 0 22 16">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -4.000000)" fill="#1976d2">
            <polygon points="20.6465116 4 8.7255814 15.5061728 3.35348837 10.3209877 1 12.5925926 7.54883721 18.9135802 8.7255814 20 9.90232558 18.9135802 23 6.27160494" />
          </g>
        </g>
      </svg>

    )
}

export default IconCheck