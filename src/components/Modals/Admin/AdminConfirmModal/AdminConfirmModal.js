import * as React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteAuthors } from "../../../../store/actions/adminActions/authorActions";
import { deleteGenres } from "../../../../store/actions/adminActions/genresActions";
import { deleteTracks } from "../../../../store/actions/adminActions/trackActions";
import { deleteUserPlaylist } from "../../../../store/actions/adminActions/usersPlaylistsActions";
import { deleteAlbumTrack } from "../../../../store/actions/adminActions/albumActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #1976d2",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  p: 4,
};

export default function AdminConfirmModal({
  openModal,
  handleShowConfirmModal,
  selected,
  isGenres,
  isUsers,
  isAuthors,
  isAlbums,
  isTracks,
  userORalbumID,
}) {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (isAuthors) {
      dispatch(deleteAuthors(selected));
    } else if (isGenres) {
      dispatch(deleteGenres(selected));
    } else if (isTracks) {
      dispatch(deleteTracks(selected));
    } else if (isUsers) {
      dispatch(deleteUserPlaylist(userORalbumID, selected.id));
    } else if (isAlbums) {
      dispatch(deleteAlbumTrack(userORalbumID, selected.id));
    }
    handleShowConfirmModal([]);
  };

  const deleteText = () => {
    if (isGenres) {
      return "жанр(ы)";
    } else if (isAuthors) {
      return "автора(ов)";
    } else if (isTracks) {
      return "трек(и)";
    } else if (isUsers) {
      return "плейлист";
    } else if (isAlbums) {
      return "трек";
    }
  };
  return (
    <Modal
      open={openModal}
      onClose={() => {
        isAlbums || isUsers
          ? handleShowConfirmModal()
          : handleShowConfirmModal(selected);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          sx={{ fontSize: "16px" }}
          variant="h6"
          component="h3"
        >
          Вы уверены что хотите удалить {deleteText()}?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleDeleteClick();
            }}
          >
            Удалить
          </Button>
          <Button
            color="info"
            variant="contained"
            startIcon={<CancelIcon />}
            onClick={() => {
              isAlbums || isUsers
                ? handleShowConfirmModal()
                : handleShowConfirmModal(selected);
            }}
          >
            Отмена
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
