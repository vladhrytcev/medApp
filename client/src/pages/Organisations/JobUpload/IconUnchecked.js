import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    svg: {
        width: '24px',
        height: '24px'
    }
}));


function IconUnchecked() {

    const classes = useStyles();

    return (
      <svg className={classes.svg} viewBox="0 0 24 24">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g stroke="#D8D8D8" strokeWidth="1">
            <rect id="Rectangle" x="1.5" y="1.5" width="15" height="15" rx="0" />
          </g>
        </g>
      </svg>
    )
}

export default IconUnchecked