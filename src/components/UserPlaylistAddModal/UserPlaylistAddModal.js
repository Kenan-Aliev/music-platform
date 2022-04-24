import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { addNewPlaylist } from "../../store/actions/userActions/playlistActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #1976d2",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  p: 4,
};

function UserPlaylistAddModal({ openModal, handleShowModal }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    handleShowModal();
    dispatch(addNewPlaylist(inputValue));
  };
  return (
    <Modal
      open={openModal}
      onClose={handleShowModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="standard-required"
          sx={{ width: "70%" }}
          label="Введите название плейлиста"
          variant="standard"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <Button
          sx={{ width: "70%", marginTop: "10px" }}
          variant="outlined"
          disabled={!inputValue || inputValue.length <= 3}
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Добавить новый плейлист
        </Button>
      </Box>
    </Modal>
  );
}

export default UserPlaylistAddModal;
