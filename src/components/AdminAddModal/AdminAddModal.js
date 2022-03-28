import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { addNewGenre } from "../../store/actions/adminActions/genresActions";
import { addNewAuthor } from "../../store/actions/adminActions/authorActions";

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

export default function AdminAddModal({
  openModal,
  handleShowModal,
  isGenres,
  isAuthors,
  isTracks,
}) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    isGenres
      ? dispatch(addNewGenre(inputValue))
      : isAuthors && dispatch(addNewAuthor(inputValue));
    handleShowModal();
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
          label={`Введите ${
            isGenres
              ? "название жанра"
              : isAuthors
              ? "имя исполнителя"
              : "название трека"
          }`}
          variant="standard"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          sx={{ width: "70%" }}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={!inputValue || inputValue.length < 3}
          onClick={handleClick}
        >
          {isAuthors
            ? "Добавить исполнителя"
            : isGenres
            ? "Добавить жанр"
            : "Добавить новый трек"}
        </Button>
      </Box>
    </Modal>
  );
}
