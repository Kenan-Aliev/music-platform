import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "../../store/actions/tracksAction";
import { getMyTracks } from "../../store/actions/userActions/trackActions";
import TrackList from "./TrackList";
import Container from "../../components/Container/Container";
import "./tracks.css";

function Tracks({ isPlayList, isUserTracks }) {
  const dispatch = useDispatch();

  const getTracks = (s) => {
    return !isPlayList && !isUserTracks
      ? s.tracks.tracks
      : !isPlayList && isUserTracks && s.userTracks.myTracks;
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
    }
  }, []);

  return (
    <div className="tracks">
      <Container>
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
      </Container>
    </div>
  );
}

export default Tracks;
