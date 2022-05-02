import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function TableRowItem({ datarow, ...rest }) {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <TableRow
      {...rest}
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
    >
      <TableCell align="left">{datarow.playList_name}</TableCell>
      <TableCell align="left">{datarow.tracksCount}</TableCell>
      {mouseOver && (
        <TableCell>
          <Tooltip title="Удалить">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}

export default TableRowItem;
