import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import MyButton from "../../../components/Button/Button";
import PLayListsList from "./PLaylistsList/PLayListsList";
import Container from "../../../components/Container/Container";
import { getUserPlaylists } from "../../../store/actions/userActions/playlistActions";
import CreateNewPlaylistModal from "../../../components/Modals/User/CreateNewPlaylistModal/CreateNewPlaylistModal";
import "./myPlaylists.css";

function MyPlayLists() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const dispatch = useDispatch();
  const userPlaylists = useSelector((s) => s.userPlaylists.userPlaylists);
  useEffect(() => {
    dispatch(getUserPlaylists());
  }, []);

  const handleShowAddModal = () => {
    setOpenAddModal(!openAddModal);
  };
  return (
    <div className="userPlaylists">
      <Container>
        <MyButton
          onClick={handleShowAddModal}
          sx={{ marginTop: "40px" }}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Добавить новый плейлист
        </MyButton>
        {!userPlaylists.length && <h1>У пользователя еще нет плейлистов</h1>}
        {userPlaylists.length > 0 &&
          userPlaylists.map((playlist) => {
            return <PLayListsList key={playlist.id} playlist={playlist} />;
          })}
        {openAddModal && (
          <CreateNewPlaylistModal
            openModal={openAddModal}
            handleShowModal={handleShowAddModal}
          />
        )}
      </Container>
    </div>
  );
}

export default MyPlayLists;
