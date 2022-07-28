import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { searchTracks } from "../../../../store/actions/tracksAction";

export default function TracksSearchoModal({
  handleClickOpen,
  open,
  handleIsSearchDataEmpty,
}) {
  const [searchData, setSearchData] = React.useState({
    trackName: "",
    authorId: "",
    genreId: "",
  });
  const genres = useSelector((s) => s.genres.genres);
  const authors = useSelector((s) => s.authors.authors);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "search") {
      if (
        Object.values(searchData).some((value) => {
          if (value) {
            return true;
          }
          return false;
        }) === true
      ) {
        dispatch(searchTracks(searchData));
        handleIsSearchDataEmpty(false);
      } else {
        handleIsSearchDataEmpty(true);
      }
    }
    handleClickOpen();
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Выберите нужные вам критерии</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Название песни"
            variant="outlined"
            name="trackName"
            value={searchData.trackName}
            onChange={handleChange}
            sx={{ m: 1, width: 3 / 4 }}
          />
          <FormControl sx={{ m: 1, width: 3 / 4 }}>
            <InputLabel id="demo-dialog-select-label">Автор</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={searchData.authorId}
              name="authorId"
              onChange={handleChange}
              input={<OutlinedInput label="Автор" />}
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
          <FormControl sx={{ m: 1, width: 3 / 4 }}>
            <InputLabel id="demo-dialog-select-label">Жанр</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={searchData.genreId}
              name="genreId"
              onChange={handleChange}
              input={<OutlinedInput label="Жанр" />}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Выйти</Button>
        <Button
          onClick={(e) => {
            handleClose(e, "search");
          }}
        >
          Найти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
