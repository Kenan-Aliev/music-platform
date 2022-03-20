import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTracks } from "../../store/actions/tracksAction";
import TrackList from "./TrackList";
import Container from "../../components/Container/Container";
import './tracks.css'

function Tracks() {
  const dispatch = useDispatch();
  const tracks = useSelector((s) => s.tracks.tracks);
  useEffect(() => {
    dispatch(getAllTracks());
  }, []);
  return (
    <div className="tracks">
      <Container>
        {tracks.map((track) => {
          return <TrackList track={track} key={track.id} />;
        })}
      </Container>
    </div>
  );
}

export default Tracks;
