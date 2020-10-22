import React from "react";
import { string, number, func } from "prop-types";

import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from "@material-ui/core";

import {
    Divider,
} from './styledComponent';


const propTypes = {
    numSelected: number.isRequired,
    onRequestSort: func.isRequired,
    onSelectAllClick: func.isRequired,
    order: string.isRequired,
    orderBy: string.isRequired,
    rowCount: number.isRequired
};


const rows = [
    { id: "email", numeric: false, disablePadding: true, label: "Email" },
    { id: "firstName", numeric: false, disablePadding: false, label: "First name" },
    { id: "lastName", numeric: false, disablePadding: false, label: "Last name" },
    { id: "contact", numeric: false, disablePadding: false, label: "Contact" },
    { id: "action", numeric: false, disablePadding: true, label: "" },
];


function OrganisationUsersTableHead({
    numSelected,
    onRequestSort,
    onSelectAllClick,
    order,
    orderBy,
    rowCount
}) {
    
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    
    return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
            {rows.map(
              row => (
                <TableCell
                  key={row.id}
                  align={row.numeric ? "right" : "left"}
                  padding={row.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ),
              this
            )}
          </TableRow>
        </TableHead>
    );
}


OrganisationUsersTableHead.propTypes = propTypes;

export default OrganisationUsersTableHead;