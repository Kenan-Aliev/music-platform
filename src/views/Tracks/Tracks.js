import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { getAllTracks } from "../../store/actions/tracksAction";
import { getMyTracks } from "../../store/actions/userActions/trackActions";
import { getPlaylistTracks } from "../../store/actions/userActions/playlistActions";
import TrackList from "./TrackList";
import Container from "../../components/Container/Container";
import "./tracks.css";

function Tracks({ isPlayList, isUserTracks }) {
  const dispatch = useDispatch();
  const { playlistID } = useParams();
  const getTracks = (s) => {
    return !isPlayList && !isUserTracks
      ? s.tracks.tracks
      : !isPlayList && isUserTracks
      ? s.userTracks.myTracks
      : s.userPlaylists.playlistTracks;
  };

  const tracks = useSelector((s) => getTracks(s));
  console.log(tracks);
  console.log("IsplayList=====> " + isPlayList);
  console.log("IsUSerTracks=====> " + isUserTracks);

  useEffect(() => {
    if (!isPlayList && !isUserTracks) {
      dispatch(getAllTracks());
    } else if (!isPlayList && isUserTracks) {
      console.log("getMyTracks");
      dispatch(getMyTracks());
    } else if (isPlayList && !isUserTracks) {
      dispatch(getPlaylistTracks(playlistID));
    }
  }, []);

  return (
    <div className="tracks">
      <Container>
        {tracks.length > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "blue" }}
            >
              {!isPlayList && !isUserTracks
                ? "Все песни"
                : isPlayList && !isUserTracks
                ? "Песни из вашего плейлиста"
                : "Ваши песни"}
            </Typography>
            {tracks.map((track) => {
              return (
                <TrackList
                  track={track}
                  key={track.id}
                  isPlayList={isPlayList}
                  isUserTracks={isUserTracks}
                />
              );
            })}
          </>
        ) : (
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "blue", margin: "auto" }}
          >
            Песен пока нет
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default Tracks;
