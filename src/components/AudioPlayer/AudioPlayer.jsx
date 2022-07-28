import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioControls from "./AudioControls";
import { rootApi } from "../../store/api";
import { setActiveTrack } from "../../store/reducers/tracksReducer";
import "./audioplayer.css";

const AudioPlayer = ({ tracks }) => {
  const dispatch = useDispatch();
  // State
  const [trackProgress, setTrackProgress] = useState(0);
  const activeTrack = useSelector((s) => s.tracks.activeTrack);
  const { trackIndex, isPlaying } = activeTrack;
  // Destructure for conciseness
  const {
    name: trackName,
    author: { name: authorName },
    audioName,
  } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(`${rootApi}/${audioName}`));
  const intervalRef = useRef();
  const isReady = useRef(false);
  console.log(tracks);
  // Destructure for conciseness
  const { duration } = audioRef.current;

  const setIsPlaying = (value) => {
    dispatch(setActiveTrack({ ...activeTrack, isPlaying: value }));
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      dispatch(setActiveTrack({ ...activeTrack, isPlaying: true }));
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      dispatch(
        setActiveTrack({
          trackID: tracks[tracks.length - 1].id,
          trackName: tracks[tracks.length - 1].name,
          activeTrackArray: activeTrack.activeTrackArray,
          trackIndex: tracks.length - 1,
          isPlaying: activeTrack.isPlaying,
        })
      );
    } else {
      dispatch(
        setActiveTrack({
          trackID: tracks[trackIndex - 1].id,
          trackName: tracks[trackIndex - 1].name,
          activeTrackArray: activeTrack.activeTrackArray,
          trackIndex: trackIndex - 1,
          isPlaying: activeTrack.isPlaying,
        })
      );
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      dispatch(
        setActiveTrack({
          trackID: tracks[trackIndex + 1].id,
          trackName: tracks[trackIndex + 1].name,
          activeTrackArray: activeTrack.activeTrackArray,
          trackIndex: trackIndex + 1,
          isPlaying: activeTrack.isPlaying,
        })
      );
    } else {
      dispatch(
        setActiveTrack({
          trackID: tracks[0].id,
          trackName: tracks[0].name,
          activeTrackArray: activeTrack.activeTrackArray,
          trackIndex: 0,
          isPlaying: activeTrack.isPlaying,
        })
      );
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setTimeout(function () {
        audioRef.current.play();
        startTimer();
      }, 150);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(`${rootApi}/${audioName}`);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      dispatch(setActiveTrack({ ...activeTrack, isPlaying: true }));
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audioPlayer">
      <div className="audioPlayer__trackInfo">
        <p className="audioPlayer__TrackTitle">{trackName}</p>
        <p className="audioPlayer__TrackArtist">{authorName}</p>
      </div>
      <div className="audioPlayer__audiocontrols">
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="audioPlayer__progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
