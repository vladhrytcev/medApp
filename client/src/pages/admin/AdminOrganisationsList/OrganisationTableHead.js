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
    { id: "name", numeric: false, disablePadding: true, label: "Organisation name" },
    { id: "address", numeric: false, disablePadding: false, label: "Address" },
    { id: "postcode", numeric: false, disablePadding: false, label: "Postcode" },
    { id: "country", numeric: false, disablePadding: false, label: "Country" },
    { id: "action", numeric: false, disablePadding: true, label: "" },
];


function EnhancedTableHead({
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


EnhancedTableHead.propTypes = propTypes;

export default EnhancedTableHead;