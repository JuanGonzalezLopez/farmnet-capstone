import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//MUI components
import TableMUI from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//utils
import { getTempUnitString } from "../../utils";

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 16
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

function Table(props) {
  const { data, front, timeString, tempUnit } = props;

  return (
    <TableMUI>
      <TableHead>
        <TableRow>
          {front && (
            <CustomTableCell
              style={{ color: "white", backgroundColor: "#4d8550" }}
            >
              {timeString}
            </CustomTableCell>
          )}
          {data.map((row, index) => {
            return (
              <CustomTableCell
                key={index}
                style={{ color: "#4d8550", backgroundColor: "white" }}
              >
                {row.x}
              </CustomTableCell>
            );
          })}
          {!front && (
            <CustomTableCell
              style={{ color: "white", backgroundColor: "#4d8550" }}
            >
              {timeString}
            </CustomTableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {front && (
            <CustomTableCell
              style={{ color: "white", backgroundColor: "#4d8550" }}
            >
              Value
            </CustomTableCell>
          )}
          {data.map((row, index) => {
            return (
              <CustomTableCell
                key={index}
                style={{ color: "#4d8550", backgroundColor: "white" }}
              >
                {row.y + getTempUnitString(tempUnit)}
              </CustomTableCell>
            );
          })}
          {!front && (
            <CustomTableCell
              style={{ color: "white", backgroundColor: "#4d8550" }}
            >
              Value
            </CustomTableCell>
          )}
        </TableRow>
      </TableBody>
    </TableMUI>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  front: PropTypes.bool.isRequired,
  tempUnit: PropTypes.string.isRequired,
  timeString: PropTypes.string.isRequired
};

export default Table;
