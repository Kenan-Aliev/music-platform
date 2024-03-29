import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlbumIcon from "@mui/icons-material/Album";
import "./tracks.css";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "../../components/Modals/User/AddToPlayListModal/AddToPlayListModal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewMusicToTrackList } from "../../store/actions/userActions/trackActions";
import { deleteTrackFromTrackList } from "../../store/actions/userActions/trackActions";
import { deleteTrackFromPlaylist } from "../../store/actions/userActions/playlistActions";
import { setActiveTrack } from "../../store/reducers/tracksReducer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const commonOptions = ["Добавить в мою музыку", "Добавить в плейлист"];
const userTrackListOptions = ["Удалить из моей музыки", "Добавить в плейлист"];
const playlistTracksOptions = ["Удалить из плейлиста"];

const ITEM_HEIGHT = 48;

function TrackList({
  isSearchedTracks,
  track,
  isPlayList,
  isUserTracks,
  userPlaylists,
  trackIndex,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isAuth = useSelector((s) => s.auth.login.success);
  const isAdmin = useSelector((s) => s.auth.user.isAdmin);
  const activeTrack = useSelector((s) => s.tracks.activeTrack);

  const dispatch = useDispatch();
  const { playlistID } = useParams();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getActiveTrackArray = () => {
    return isPlayList
      ? "playlist"
      : isUserTracks
      ? "userTracks"
      : isSearchedTracks
      ? "allTracks"
      : "searchedTracks";
  };

  const setOptions = () => {
    return !isPlayList && !isUserTracks
      ? commonOptions
      : !isPlayList && isUserTracks
      ? userTrackListOptions
      : playlistTracksOptions;
  };

  const handleSetTrackActive = (track) => {
    dispatch(setActiveTrack(track));
  };

  const handleClose = (option, trackId) => {
    setAnchorEl(null);
    if (typeof option === "string" && option === "Добавить в плейлист") {
      if (isAuth && !isAdmin) {
        setOpenModal(!openModal);
      } else {
        toast.error(
          "Чтобы добавить песню в ваши плейлисты, вы должны быть авторизованы и обычным пользователем"
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
    } else if (
      typeof option === "string" &&
      option === "Удалить из моей музыки"
    ) {
      dispatch(deleteTrackFromTrackList(trackId));
    } else if (
      typeof option === "string" &&
      option === "Удалить из плейлиста"
    ) {
      dispatch(deleteTrackFromPlaylist(playlistID, trackId));
    }
  };

  return (
    <div
      className="track"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="trackLeft">
        <div className="track__img">
          <AlbumIcon sx={{ color: "blue", fontSize: "60px" }} />
          {isMouseOver &&
            activeTrack.trackName === track.name &&
            activeTrack.isPlaying && (
              <PauseIcon
                onClick={() => {
                  const activetrack = {
                    trackID: track.id,
                    trackName: track.name,
                    activeTrackArray: getActiveTrackArray(),
                    trackIndex,
                    isPlaying: false,
                  };
                  handleSetTrackActive(activetrack);
                }}
                sx={{
                  position: "absolute",
                  top: "15px",
                  left: "16px",
                  color: "white",
                  fontSize: "30px",
                }}
              />
            )}
          {isMouseOver &&
            (activeTrack.trackName !== track.name ||
              !activeTrack.isPlaying) && (
              <PlayArrowIcon
                onClick={() => {
                  const activeTrack = {
                    trackID: track.id,
                    trackName: track.name,
                    activeTrackArray: getActiveTrackArray(),
                    trackIndex,
                    isPlaying: true,
                  };
                  handleSetTrackActive(activeTrack);
                }}
                sx={{
                  position: "absolute",
                  top: "15px",
                  left: "16px",
                  color: "white",
                  fontSize: "30px",
                }}
              />
            )}
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
          {setOptions().map((option) => (
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
            userPlaylists={userPlaylists}
            track={track}
          />
        )}
      </div>
    </div>
  );
}

export default TrackList;
