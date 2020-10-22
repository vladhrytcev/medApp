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

import DeleteCustomerssModalWindow from './DeleteCustomerssModalWindow';

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
    handleDeleteDepartmentCustomer: func,
    local: object,
    depId: string,
    orgId: string,
    changeSearchFilter: func,
};

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));


function DepartmentCustomersTableToolbar({
  numSelected,
  handleResetAllSelected,
  selectedNames,
  handleDeleteDepartmentCustomer,
  local,
  depId,
  orgId,
  changeSearchFilter,
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
                  <NavLink to={`/${local.language}/admin/addNewDepartmentCustomer/${orgId}/${depId}`}> 
                    <IconButton aria-label="Add">
                      <AddIcon />
                    </IconButton>
                  </NavLink>
                </Tooltip>
            }
          </div>
        </Toolbar>
        <DeleteCustomerssModalWindow
          isDeleteModalVisible={isDeleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          handleResetAllSelected={handleResetAllSelected}
          selectedNames={selectedNames}
          handleDeleteDepartmentCustomer={handleDeleteDepartmentCustomer}
        />
        </React.Fragment>
    );
}


DepartmentCustomersTableToolbar.propTypes = propTypes;

export default DepartmentCustomersTableToolbar;