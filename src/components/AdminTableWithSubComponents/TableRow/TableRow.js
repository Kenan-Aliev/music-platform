import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AdminConfirmModal from "../../Modals/Admin/AdminConfirmModal/AdminConfirmModal";

function TableRowItem({ datarow, isAlbums,userORalbumID, ...rest }) {
  const [mouseOver, setMouseOver] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleShowConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <>
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
        <TableCell align="left" padding="none">
          {mouseOver && (
            <Tooltip title="Удалить">
              <IconButton
                onClick={() => {
                  setOpenConfirmModal(!openConfirmModal);
                }}
              >
                <DeleteIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>

      {openConfirmModal && (
        <AdminConfirmModal
          openModal={openConfirmModal}
          handleShowConfirmModal={handleShowConfirmModal}
          isUsers={!isAlbums}
          isAlbums={isAlbums}
          selected={datarow}
          userORalbumID={userORalbumID}
        />
      )}
    </>
  );
}

export default TableRowItem;
