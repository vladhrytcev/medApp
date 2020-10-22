import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { closeDeletingDialog } from '../redux/actions/shared'

const useStyles = makeStyles(theme => ({
  highlighted: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  error: {
    color: theme.palette.error.main
  }
}));

export default function DeletingDialog({

}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector(state => state.shared.deletingDialog.deletingIsOpened);
  const onDeletingSubmit = useSelector(state => state.shared.deletingDialog.onDeletingSubmit);
  const onDeletingCancel = useSelector(state => state.shared.deletingDialog.onDeletingCancel);
  const deletingNameKey = useSelector(state => state.shared.deletingDialog.deletingNameKey);
  const deletingFormData = useSelector(state => state.shared.deletingDialog.deletingFormData);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure to delete?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are deleting&ensp;
            <span className={classes.highlighted}>
              {!!deletingFormData &&
                deletingNameKey &&
                deletingFormData[deletingNameKey]}
            </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary" 
          onClick={() => {
            dispatch(closeDeletingDialog())
            onDeletingSubmit();
          }}
        >
          Delete
        </Button>
        <Button
          color="primary" 
          onClick={() => {
            dispatch(closeDeletingDialog());
            onDeletingCancel();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}