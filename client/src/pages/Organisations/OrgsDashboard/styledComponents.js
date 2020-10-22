import React from "react";
import { withStyles, useTheme, makeStyles} from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from '@material-ui/core/Checkbox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Block } from "@material-ui/icons";

const StyledCheckbox = withStyles(theme => ({
  root: {
    padding: 4,
    marginRight: 16,
    color: props => theme.colors[props.colors],
    "& .MuiIconButton-label": {
      position: "relative",
      zIndex: 0
    },
    "&:not($checked) .MuiIconButton-label:after": {
      content: '""',
      left: 4,
      top: 4,
      height: 15,
      width: 15,
      position: "absolute",
      backgroundColor: props => theme.colors[props.colors],
      zIndex: -1
    }
  },
  checked: {
    color: props => `${theme.colors[props.colors]} !important`
  }}))(props => <Checkbox {...props} />);

const StyledTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium,
  },
  body: {
    font: theme.typography.fontFamily,
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    border: "1px solid #e0e0e0",
    "&:nth-of-type(even)": {
      backgroundColor: theme.colors.tableRowColor
    },
    '&>th:first-child': {
      width: '25%',
    },
    '&>th:nth-child(2)': {
      width: '18%',
    },
    '&>th:nth-child(3)': {
      width: '22%',
    },
    '&>th:nth-child(4)': {
      width: '32%',
    },
    '&>th:nth-child(5)': {
      width: '3%',
    },
  }
}))(TableRow);

const StyledTypography = withStyles(theme => ({
  root:{
    color: theme.colors.blue700,
    marginBottom: theme.spacing(8)
  }
}))(Typography);


const useStyles = makeStyles(theme => ({
  formWrapper: {
    background: theme.palette.common.white,
    padding: theme.spacing(8),
  },
  highlighted:{
    fontWeight: theme.typography.fontWeightMedium
  },
  img: {
    paddingRight: theme.spacing(2)
  },
  pointer: {
    '&:hover':{
      cursor: "pointer",
      color: theme.colors.blue700
    }
  },
  headColor: {
    background: props =>  theme.colors[props.color]
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  paddingTop: {
    display: 'block',
    paddingTop: 3
  }
}));


export { 
  useStyles,
  StyledCheckbox,
  StyledTableCell, 
  StyledTableRow,
  StyledTypography,
};