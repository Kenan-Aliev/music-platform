import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../components/Container/Container";
import { getUserPlaylists } from "../../../store/actions/userActions/playlistActions";
import "./myPlaylists.css";

function MyPlayLists() {
  const dispatch = useDispatch();
  const userPlaylists = useSelector((s) => s.userPlaylists.userPlaylists);
  useEffect(() => {
    dispatch(getUserPlaylists());
  }, []);
  return (
    <div className="userPlaylists">
      <Container>
        {!userPlaylists.length && <h1>У пользователя еще нет плейлистов</h1>}
        {userPlaylists.length > 0 && <div>fer</div>}
      </Container>
    </div>
  );
}

export default MyPlayLists;
