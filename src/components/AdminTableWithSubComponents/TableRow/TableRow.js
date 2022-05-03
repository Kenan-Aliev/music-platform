import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function TableRowItem({ datarow, isAlbums, ...rest }) {
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
      {isAlbums ? (
        <TableCell align="left" padding="normal">
          {datarow.name}
        </TableCell>
      ) : (
        <>
          <TableCell align="left" padding="normal">
            {datarow.playList_name}
          </TableCell>
          <TableCell align="left" padding="normal">
            {datarow.tracksCount}
          </TableCell>
        </>
      )}
      <TableCell align="left" padding="normal">
        {mouseOver && (
          <Tooltip title="Удалить">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
