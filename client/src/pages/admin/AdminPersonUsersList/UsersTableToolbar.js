import React from "react";
import { number, func, array, object, string } from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {
    Delete as DeleteIcon,
    AddCircle as AddIcon
} from "@material-ui/icons";
import {
  Search as SearchIcon,
} from "react-feather";

import DeleteModalWindow from './DeleteModalWindow';

import {
    Spacer,
    RouterNavLink,
    Search,
    SearchIconWrapper,
    Input
} from './styledComponent';


const propTypes = {
    numSelected: number,
    handleResetAllSelected: func,
    selectedNames: array,
    handleDeletePersonUsers: func,
    local: object,
    changeSearchFilter: func,
    personType: array,
};

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));


function UsersTableToolbar({
  numSelected,
  handleResetAllSelected,
  selectedNames,
  handleDeletePersonUsers,
  local,
  changeSearchFilter,
  personType,
}) {
    const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);

    const handleOpenDeleteModal = () => {
      setDeleteModalVisible(true);
    }

    const handleChangeSearch = (e) => {
      const value = e.target.value;
      changeSearchFilter(value.toLowerCase());
    }

    return (
        <React.Fragment>
        <Toolbar>
          <div>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle"></Typography>
            )}
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input placeholder="Search…" onChange={handleChangeSearch} />
          </Search>
          <Spacer />
          <div>
            {
              numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="Delete" onClick={handleOpenDeleteModal}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : <Tooltip title="Add">
                  <NavLink to={`/${local.language}/admin/addNewPersonUser/${personType}`}> 
                    <IconButton aria-label="Add">
                      <AddIcon />
                    </IconButton>
                  </NavLink>
                </Tooltip>
            }
          </div>
        </Toolbar>
        <DeleteModalWindow
          isDeleteModalVisible={isDeleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          handleResetAllSelected={handleResetAllSelected}
          selectedNames={selectedNames}
          handleDeletePersonUsers={handleDeletePersonUsers}
        />
        </React.Fragment>
    );
}


UsersTableToolbar.propTypes = propTypes;

export default UsersTableToolbar;