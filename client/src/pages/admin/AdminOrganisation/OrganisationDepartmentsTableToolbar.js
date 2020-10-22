import React from "react";
import { number, func, array, object, string } from 'prop-types';

import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton
} from "@material-ui/core";
import {
    Delete as DeleteIcon,
    AddCircle as AddIcon
} from "@material-ui/icons";
import {
  Search as SearchIcon,
} from "react-feather";

import DeleteDepartmentModalWindow from './DeleteDepartmentModalWindow';

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
    handleDeleteOrganisationAgencies: func,
    local: object,
    agencyId: string,
    changeSearchFilter: func,
    entity: string,
    match: object
};

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));


function OrganisationDepartmentsTableToolbar({
  numSelected,
  handleResetAllSelected,
  selectedNames,
  handleDeleteOrganisationAgencies,
  local,
  agencyId,
  changeSearchFilter,
  entity,
  match
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
                  <NavLink to={`/${local.language}/admin/addNewDepartment/${match.params.id}`}> 
                    <IconButton aria-label="Add">
                      <AddIcon />
                    </IconButton>
                  </NavLink>
                </Tooltip>
            }
          </div>
        </Toolbar>
        <DeleteDepartmentModalWindow
          isDeleteModalVisible={isDeleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          handleResetAllSelected={handleResetAllSelected}
          selectedNames={selectedNames}
          handleDeleteOrganisationAgencies={handleDeleteOrganisationAgencies}
        />
        </React.Fragment>
    );
}


OrganisationDepartmentsTableToolbar.propTypes = propTypes;

export default OrganisationDepartmentsTableToolbar;