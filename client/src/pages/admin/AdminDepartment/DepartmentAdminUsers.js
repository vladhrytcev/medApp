import React from "react";
import { array, object, func } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "material-ui-flat-pagination";
import TableRow from "@material-ui/core/TableRow";
import DepartmentUsersTableToolbar from './DepartmentUsersTableToolbar';
import DepartmentUsersTableHead from './DepartmentUsersTableHead';

import {
    Card,
    Paper,
    TableWrapper,
    RouterNavLink
} from './styledComponent';




const propTypes = {
    departmentUsersList: array,
    local: object,
    match: object,
    deleteAdminDepartmentUsers: func
};



const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
  
function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
}

function selectedUsersNames(departmentUsersList, selectedIds) {
    const names = departmentUsersList.reduce((acc, item) => {
        if(selectedIds.includes(item.id)) {
            acc.push(item.email);
        }
        return acc;
    }, []);

    return names;
}

class DepartmentAdminUsers extends React.Component {

    state = {
        order: "asc",
        orderBy: "name",
        selected: [],
        page: 0,
        offset: 0,
        rowPaginationLimits: 5,
        data: this.props.departmentUsersList || []
    };

    componentDidUpdate(prevProps) {
        if (this.props.departmentUsersList !== prevProps.departmentUsersList) {
          this.setState({ data: this.props.departmentUsersList })
        }
    }
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";
    
        if (this.state.orderBy === property && this.state.order === "desc") {
          order = "asc";
        }
    
        this.setState({ order, orderBy });
    };
    
    handleSelectAllClick = event => {
        if (event.target.checked) {
          this.setState(state => ({ selected: this.state.data.map(n => n.id) }));
          return;
        }
        this.setState({ selected: [] });
    };
    
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        }
    
        this.setState({ selected: newSelected });
    };
    
    handleChangePage = (offset) => {
        const page = offset / this.state.rowPaginationLimits;
        this.setState({ offset, page: page });
    };
  
    handleResetAllSelected = () => {
          this.setState({ selected: [] });
    }
  
    handleDeleteAdminDepartment = () => {
          this.props.deleteAdminDepartmentUsers(this.state.selected);
    }

    handleChangeSearchFilter = (value) => {
        const rawData = [...this.props.departmentUsersList];
        const newData = rawData.filter(item =>
          item.contact.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value) ||
          item.firstName.toLowerCase().includes(value) ||
          item.lastName.toLowerCase().includes(value))
        this.setState({data: newData});
    }
    
    isSelected = id => this.state.selected.indexOf(id) !== -1;


    render(){
        const { order, orderBy, selected, page, offset, rowPaginationLimits, data } = this.state;
        const { local, match } = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Card mb={6}>
                            <Paper>
                                <DepartmentUsersTableToolbar
                                    numSelected={selected.length}
                                    handleResetAllSelected={this.handleResetAllSelected}
                                    selectedNames={selectedUsersNames(data, selected)}
                                    handleDeleteAdminDepartment={this.handleDeleteAdminDepartment}
                                    local={local}
                                    depId={match.params.depId}
                                    orgId={match.params.orgId}
                                    changeSearchFilter={this.handleChangeSearchFilter}
                                    entity="user"
                                />
                                <TableWrapper>
                                    <Table aria-labelledby="tableTitle">
                                        <DepartmentUsersTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={this.handleSelectAllClick}
                                            onRequestSort={this.handleRequestSort}
                                            rowCount={data.length}
                                        />
                                        <TableBody>
                                            {stableSort(data, getSorting(order, orderBy))
                                            .slice(page * rowPaginationLimits, page * rowPaginationLimits + rowPaginationLimits)
                                            .map(n => {
                                                const isSelected = this.isSelected(n.id);
                                                return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => this.handleClick(event, n.id)}
                                                    />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                    {n.email}
                                                    </TableCell>
                                                    <TableCell>{n.firstName}</TableCell>
                                                    <TableCell>{n.lastName}</TableCell>
                                                    <TableCell>{n.contact}</TableCell>
                                                    <TableCell>
                                                        <NavLink to={`/${local.language}/admin/departmentUsers/${match.params.orgId}/${match.params.depId}/${n.id}`}>
                                                            View Details
                                                        </NavLink>
                                                    </TableCell>
                                                </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableWrapper>
                                <Grid container justify="flex-end" alignItems="center">
                                    <Grid item>Page: </Grid>
                                    <Grid item>
                                        <Pagination
                                        limit={rowPaginationLimits}
                                        offset={offset}
                                        total={data.length}
                                        onClick={(e, offset) => this.handleChangePage(offset)}
                                        currentPageColor="default"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


DepartmentAdminUsers.propTypes = propTypes;


export default DepartmentAdminUsers;