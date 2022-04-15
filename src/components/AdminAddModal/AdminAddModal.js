import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addNewGenre } from "../../store/actions/adminActions/genresActions";
import { addNewAuthor } from "../../store/actions/adminActions/authorActions";
import { addNewTrack } from "../../store/actions/adminActions/trackActions";

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

export default function AdminAddModal({
  openModal,
  handleShowModal,
  isGenres,
  isAuthors,
  isTracks,
}) {
  const [inputValue, setInputValue] = useState("");
  const [trackData, setTrackData] = useState({ genre: "", author: "" });
  const dispatch = useDispatch();
  const genres = useSelector((s) => s.genres.genres);
  const authors = useSelector((s) => s.authors.authors);

  const handleChange = (event) => {
    setTrackData({ ...trackData, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    isGenres
      ? dispatch(addNewGenre(inputValue))
      : isAuthors
      ? dispatch(addNewAuthor(inputValue))
      : isTracks &&
        dispatch(
          addNewTrack({
            name: inputValue,
            authorId: trackData.author,
            genreId: trackData.genre,
          })
        );
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
        {isTracks && (
          <Box sx={{ width: "70%" }}>
            <FormControl fullWidth sx={{ marginTop: "15px" }}>
              <InputLabel id="demo-simple-select-label">
                Выберите жанр
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={trackData.genre}
                name="genre"
                label="Выберите жанр"
                onChange={handleChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label">
                Выберите автора
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={trackData.author}
                name="author"
                label="Выберите автора"
                onChange={handleChange}
              >
                {authors.map((author) => {
                  return (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        <Button
          sx={{ width: "70%", marginTop: "10px" }}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={
            isTracks
              ? !inputValue ||
                inputValue.length < 3 ||
                !trackData.author ||
                !trackData.genre
              : !inputValue || inputValue.length < 3
          }
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
