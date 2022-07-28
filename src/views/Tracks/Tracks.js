import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getMyTracks } from "../../store/actions/userActions/trackActions";
import { getPlaylistTracks } from "../../store/actions/userActions/playlistActions";
import { getAllTracks } from "../../store/actions/tracksAction";
import { getAllGenres } from "../../store/actions/adminActions/genresActions";
import { getAllAuthors } from "../../store/actions/adminActions/authorActions";
import { resetSearchTracks } from "../../store/reducers/tracksReducer";
import TrackList from "./TrackList";
import Container from "../../components/Container/Container";
import "./tracks.css";
import TracksSearchoModal from "../../components/Modals/Common/TracksSearchModal/TracksSearchModal";

function Tracks({ isPlayList, isUserTracks }) {
  const [open, setOpen] = useState(false);
  const [isSearchDataEmpty, setIsSearchDataEmpty] = useState(true);
  const userPlaylists = useSelector((s) => s.userPlaylists.userPlaylists);
  const searchTracksSuccess = useSelector((s) => s.tracks.searchTracks.success);
  const searchedTracks = useSelector((s) => s.tracks.searchedTracks);
  const dispatch = useDispatch();
  const { playlistID } = useParams();

  const getTracks = (s) => {
    if (!isPlayList && !isUserTracks) {
      return s.tracks.tracks;
    } else if (!isPlayList && isUserTracks) {
      return s.userTracks.myTracks;
    } else {
      return s.userPlaylists.playlistTracks;
    }
  };

  const tracks = useSelector((s) => getTracks(s));

  useEffect(() => {
    if (isPlayList && !isUserTracks) {
      dispatch(getPlaylistTracks(playlistID));
    } else if (!isUserTracks && !isPlayList) {
      dispatch(getAllTracks());
      dispatch(getAllAuthors());
      dispatch(getAllGenres());
    }
  }, []);

  useEffect(() => {
    if (isUserTracks) {
      dispatch(getMyTracks());
    }
    // return () => {
    //   dispatch(resetSearchTracks());
    //   console.log("hi");
    // };
  }, []);

  const handleClickOpen = () => {
    setOpen(!open);
  };
  const typographyText = () => {
    if (!isPlayList && !isUserTracks) {
      if (isSearchDataEmpty) {
        return "Все песни";
      }
      return "Найденные песни по вашему запросу";
    } else if (isPlayList && !isUserTracks) {
      return "Песни из вашего плейлиста";
    } else {
      return "Ваши песни";
    }
  };

  const handleIsSearchDataEmpty = (isEmpty) => {
    setIsSearchDataEmpty(isEmpty);
  };

  const getTracksArray = () => {
    if (isSearchDataEmpty) {
      return tracks;
    } else {
      return searchedTracks;
    }
  };

  return (
    <div
      className="tracks"
      style={{ marginTop: isUserTracks || isPlayList ? "20vh" : "15vh" }}
    >
      {!isUserTracks && !isPlayList && tracks.length > 0 && (
        <Button
          startIcon={<SearchOutlinedIcon />}
          variant="outlined"
          sx={{ marginLeft: "20px" }}
          onClick={handleClickOpen}
        >
          Поиск песен
        </Button>
      )}
      <Container>
        {tracks.length === 0 && (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "blue", margin: "auto" }}
          >
            Песен пока нет
          </Typography>
        )}
        {getTracksArray().length > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                color: "blue",
              }}
            >
              {typographyText()}
            </Typography>
            {getTracksArray().map((track, index) => {
              return (
                <TrackList
                  isSearchedTracks={isSearchDataEmpty}
                  track={track}
                  trackIndex={index}
                  key={track.id}
                  isPlayList={isPlayList}
                  isUserTracks={isUserTracks}
                  userPlaylists={userPlaylists}
                />
              );
            })}
          </>
        ) : (
          searchTracksSuccess &&
          searchedTracks.length === 0 && (
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "blue", margin: "auto" }}
            >
              Нет песен,удовлетворяющих вашему запросу
            </Typography>
          )
        )}
      </Container>
      {open && (
        <TracksSearchoModal
          handleClickOpen={handleClickOpen}
          open={open}
          handleIsSearchDataEmpty={handleIsSearchDataEmpty}
        />
      )}
    </div>
  );
}

export default Tracks;
