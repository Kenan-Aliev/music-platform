import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { addTrackToPlaylists } from "../../../../store/actions/userActions/playlistActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #1976d2",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 4,
};

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

function getStyles(name, personName, theme) {
  console.log(name);
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function BasicModal(props) {
  const [playlistName, setPlaylistName] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      setPlaylistName([]);
    };
  }, []);

  const handleClose = () => props.setOpenModal(!props.openModal);
  const handleClick = () => {
    props.setOpenModal(!props.openModal);
    dispatch(addTrackToPlaylists(playlistName, props.track.id));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPlaylistName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!props.userPlaylists.length && (
            <Typography variant="h5">У вас еще нет плейлистов</Typography>
          )}
          {props.userPlaylists.length > 0 && (
            <>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">
                  Выберите плейлисты
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={playlistName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Выберите плейлисты"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.playList_name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {props.userPlaylists.map((playlist) => (
                    <MenuItem
                      key={playlist.id}
                      value={playlist}
                      style={getStyles(
                        playlist.playList_name,
                        playlistName,
                        theme
                      )}
                    >
                      {playlist.playList_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                disabled={playlistName.length === 0}
                variant="contained"
                sx={{ width: "300px", marginTop: "10px" }}
                onClick={handleClick}
              >
                Добавить
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
