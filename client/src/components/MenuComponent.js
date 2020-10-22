import React, { useState } from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
  Menu,
  IconButton,
  MenuItem,
} from "@material-ui/core";

export default function MenuComponent({
  handleDelete,
  handleEdit
}){
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={() => {
          handleEdit();
          handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleDelete();
          handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>   
  );
}