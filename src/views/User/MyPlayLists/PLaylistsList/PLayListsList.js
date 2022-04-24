import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import "./playlistsList.css";
import { deletePlaylist } from "../../../../store/actions/userActions/playlistActions";

const options = ["Удалить плейлист", "Перейти к плейлисту"];

const ITEM_HEIGHT = 48;

function PLayListsList({ playlist }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option, playlistId) => {
    setAnchorEl(null);
    if (typeof option === "string" && option === "Удалить плейлист") {
      dispatch(deletePlaylist(playlistId));
    } else if (typeof option === "string" && option === "Удалить плейлист") {
      navigate(`/user/myPlaylists/${playlistId}`);
    }
  };
  return (
    <div className="playlistItem">
      <div className="playlistItem__title">{playlist.playList_name}</div>
      <div className="playlistItem__right">
        <IconButton
          aria-label="more"
          id="long-button"
          sx={{ color: "black" }}
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                handleClose(option, playlist.id);
              }}
              sx={{ fontSize: "12px" }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default PLayListsList;
