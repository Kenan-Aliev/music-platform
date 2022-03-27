import React, { useState } from "react";
import AlbumIcon from "@mui/icons-material/Album";
import "./tracks.css";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "../../components/AddToPlayListModal/AddToPlayListModal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewMusicToTrackList } from "../../store/actions/tracksAction";

const options = ["Добавить в мою музыку", "Добавить в плейлист"];

const ITEM_HEIGHT = 48;

function TrackList({ track }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const isAuth = useSelector((s) => s.auth.login.success);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option, trackId) => {
    setAnchorEl(null);
    if (typeof option === "string" && option === "Добавить в плейлист") {
      if (isAuth) {
        setOpenModal(!openModal);
      } else {
        toast.error(
          "Чтобы добавить песню в ваши плейлисты, вы должны быть авторизованы"
        );
      }
    } else if (
      typeof option === "string" &&
      option === "Добавить в мою музыку"
    ) {
      if (isAuth) {
        dispatch(addNewMusicToTrackList(trackId));
      } else {
        toast.error(
          "Чтобы добавить песню в вашу музыку, вы должны быть авторизованы"
        );
      }
    }
  };

  return (
    <div className="track">
      <div className="trackLeft">
        <div className="track__img">
          <AlbumIcon sx={{ color: "blue", fontSize: "60px" }} />
        </div>
        <div className="track__info">
          <div className="track__name">{track.name}</div>
          <div className="track__author">{track.author.name}</div>
        </div>
      </div>
      <div className="trackRight">
        <IconButton
          aria-label="more"
          id="long-button"
          sx={{ color: "white" }}
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
                handleClose(option, track.id);
              }}
              sx={{ fontSize: "12px" }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            show={"playListSelect"}
          />
        )}
      </div>
    </div>
  );
}

export default TrackList;
