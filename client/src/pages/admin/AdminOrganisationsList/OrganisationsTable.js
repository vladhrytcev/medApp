import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";

import OrganisationTableToolbar from './OrganisationTableToolbar';
import OrganisationTableHead from './OrganisationTableHead';

import {
    Card,
    Paper,
    TableWrapper,
    RouterNavLink
} from './styledComponent';



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

function selectedAgenciesNames(organisationsList, selectedIds) {
    const names = organisationsList.reduce((acc, item) => {
        if(selectedIds.includes(item.id)) {
            acc.push(item.name);
        }
        return acc;
    }, []);

    return names;
}



class OrganisationsTable extends React.Component {
    
    state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      page: 0,
      offset: 0,
      rowPaginationLimits: 5,
      data: this.props.organisationsList || []
    };

    componentDidUpdate(prevProps) {
      if (this.props.organisationsList !== prevProps.organisationsList) {
        this.setState({ data: this.props.organisationsList })
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

    handleDeleteAdminAgencies = () => {
        this.props.deleteAdminOrganisations(this.state.selected);
    }

    handleChangeSearchFilter = (value) => {
      const rawData = [...this.props.organisationsList];
      const newData = rawData.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.postcode.toLowerCase().includes(value) ||
        item.address.toLowerCase().includes(value) ||
        item.country.toLowerCase().includes(value))
      this.setState({data: newData});
    }
  
    isSelected = id => this.state.selected.indexOf(id) !== -1;
  
    render() {
      const { order, orderBy, selected, page, offset, rowPaginationLimits, data } = this.state;
      const { local } = this.props;
  
      return (
        <Card mb={6}>
          <Paper>
            <OrganisationTableToolbar
                numSelected={selected.length}
                handleResetAllSelected={this.handleResetAllSelected}
                selectedNames={selectedAgenciesNames(data, selected)}
                handleDeleteAdminAgencies={this.handleDeleteAdminAgencies}
                local={local}
                changeSearchFilter={this.handleChangeSearchFilter}
            />
            <TableWrapper>
              <Table aria-labelledby="tableTitle">
                <OrganisationTableHead
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
                      const isSelected = this.isSelected(n._id);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n._id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onClick={event => this.handleClick(event, n._id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {n.name}
                          </TableCell>
                          <TableCell>{n.address}</TableCell>
                          <TableCell>{n.postcode}</TableCell>
                          <TableCell>{n.country}</TableCell>
                          <TableCell>
                              <NavLink to={`/${local.language}/admin/organisation/${n._id}`}>
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
      );
    }
}
  
OrganisationsTable.propTypes = {
    organisationsList: PropTypes.array,
    local: PropTypes.object.isRequired,
    deleteAdminOrganisations: PropTypes.func
};

export default OrganisationsTable;