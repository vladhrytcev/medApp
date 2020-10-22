import React from 'react';
import { bool, func, array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";



const propTypes = {
    isDeleteModalVisible: bool,
    setDeleteModalVisible: func,
    handleResetAllSelected: func,
    selectedNames: array,
    handleDeletePersonUsers: func
};

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonGroup: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > button:last-of-type': {
        backgroundColor: theme.palette.error.main,
        color: '#fff'
      },
      '& > button:last-of-type:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
}));



function DeleteModalWindow({
    isDeleteModalVisible,
    setDeleteModalVisible,
    handleResetAllSelected,
    selectedNames,
    handleDeletePersonUsers
}) {
  const classes = useStyles();

  const handleClose = () => {
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleApproveDelete = () => {
    setDeleteModalVisible(false);
    handleResetAllSelected();
    handleDeletePersonUsers();
  };


  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isDeleteModalVisible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDeleteModalVisible}>
          <div className={classes.paper}>
            <Typography
                variant="h4"
                id="transition-modal-title"
                gutterBottom
            >
                Are you sure want to delete this users:
            </Typography>
            {
                selectedNames.map(item =>
                    <Typography key={item} variant="h6" id="transition-modal-description">{item}</Typography>)
            }
            <div className={classes.buttonGroup}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancelDelete}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleApproveDelete}
                >
                    Delete
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
  );
}

DeleteModalWindow.propTypes = propTypes;

export default DeleteModalWindow