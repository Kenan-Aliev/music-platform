import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Button from "../../../Button/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import { addNewGenre } from "../../../../store/actions/adminActions/genresActions";
import { addNewAuthor } from "../../../../store/actions/adminActions/authorActions";
import { addNewTrack } from "../../../../store/actions/adminActions/trackActions";
import { addNewAlbum } from "../../../../store/actions/adminActions/albumActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedTracks, theme) {
  return {
    fontWeight:
      selectedTracks.findIndex((track) => track.trackName === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  isAlbums,
  isTracks,
}) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [trackData, setTrackData] = useState({ genre: "", author: "" });
  const [albumData, setAlbumData] = useState({
    year: new Date(),
    authorId: "",
  });
  const [selectedTracks, setSelectedTracks] = useState([]);
  const dispatch = useDispatch();
  const genres = useSelector((s) => s.genres.genres);
  const authors = useSelector((s) => s.authors.authors);
  const tracks = useSelector((s) => s.adminTracks.tracks);
  const albums = useSelector((s) => s.albums.albums);
  const getTracksAuthors = useMemo(() => {
    let tracksAuthors = [];
    for (let author of authors) {
      for (let t of tracks) {
        if (author.id === t.author.id) {
          tracksAuthors = [
            ...tracksAuthors,
            {
              id: t.id,
              author: { id: author.id },
              trackName: `${author.name} - ${t.name}`,
            },
          ];
        }
      }
    }
    for (let album of albums) {
      for (let t of album.tracks) {
        tracksAuthors = tracksAuthors.filter((track) => track.id !== t.id);
      }
    }
    tracksAuthors.sort((a, b) => {
      return a["trackName"] - b["trackName"];
    });
    return tracksAuthors;
  }, [authors, tracks, albums]);

  const handleTrackDataChange = (event) => {
    setTrackData({ ...trackData, [event.target.name]: event.target.value });
  };

  const handleAlbumDataChange = (event) => {
    setAlbumData({ ...albumData, [event.target.name]: event.target.value });
  };
  const handleTrackSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTracks(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleBtnClick = () => {
    if (isGenres) {
      dispatch(addNewGenre(inputValue));
    } else if (isAuthors) {
      dispatch(addNewAuthor(inputValue));
    } else if (isTracks) {
      dispatch(
        addNewTrack({
          name: inputValue,
          authorId: trackData.author,
          genreId: trackData.genre,
        })
      );
    } else if (isAlbums) {
      dispatch(
        addNewAlbum({
          name: inputValue,
          year: albumData.year.getFullYear(),
          authorId: albumData.authorId,
          tracks: selectedTracks,
        })
      );
    }
    handleShowModal();
  };

  const getInputLabel = () => {
    if (isGenres) {
      return "название жанра";
    } else if (isAuthors) {
      return "имя исполнителя";
    } else if (isTracks) {
      return "название трека";
    } else if (isAlbums) {
      return "название альбома";
    }
  };

  const getBtnText = () => {
    if (isAuthors) {
      return "Создать исполнителя";
    } else if (isTracks) {
      return "Создать новый трек";
    } else if (isAlbums) {
      return "Создать новый альбом";
    } else if (isGenres) {
      return "Создать новый жанр";
    }
  };

  const btnDisable = () => {
    if (isTracks) {
      return (
        !inputValue ||
        inputValue.length < 3 ||
        !trackData.author ||
        !trackData.genre
      );
    } else if (isAlbums) {
      return (
        !inputValue ||
        inputValue.length < 3 ||
        !selectedTracks.length ||
        !albumData.authorId ||
        !albumData.year
      );
    } else {
      return !inputValue || inputValue.length < 3;
    }
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
          label={`Введите ${getInputLabel()}`}
          variant="standard"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {isTracks ? (
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
                onChange={handleTrackDataChange}
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
                onChange={handleTrackDataChange}
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
        ) : (
          isAlbums && (
            <Box sx={{ width: "70%" }}>
              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Выберите треки
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedTracks}
                  onChange={handleTrackSelectChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Выберите треки"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.trackName} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {getTracksAuthors.map((track) => (
                    <MenuItem
                      key={track.id}
                      value={track}
                      style={getStyles(track.trackName, selectedTracks, theme)}
                    >
                      {track.trackName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Выберите исполнителя
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={albumData.authorId}
                  name="authorId"
                  label="Выберите исполнителя"
                  onChange={handleAlbumDataChange}
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    views={["year"]}
                    label="Год выпуска альбома"
                    value={albumData.year}
                    onChange={(newValue) => {
                      setAlbumData({ ...albumData, year: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
          )
        )}

        <Button
          sx={{ width: "70%", marginTop: "20px" }}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={btnDisable()}
          onClick={handleBtnClick}
        >
          {getBtnText()}
        </Button>
      </Box>
    </Modal>
  );
}
