import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getAllAuthors } from "../../../store/actions/adminActions/authorActions";
import { getAllGenres } from "../../../store/actions/adminActions/genresActions";
import { getAllTracks } from "../../../store/actions/adminActions/trackActions";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import AdminAddModal from "../../../components/AdminAddModal/AdminAddModal";
import "./editPage.css";
import AdminConfirmModal from "../../../components/AdminConfirmModal/AdminConfirmModal";
import AdminTableWithSubComponents from "../../../components/AdminTableWithSubComponents/AdminTableWithSubComponents";
import { getUsersPlaylists } from "../../../store/actions/adminActions/usersPlaylistsActions";

function EditPage({ title, isGenres, isUsers, isAuthors, isTracks, isAlbums }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const getData = (store) => {
    if (isAuthors) {
      return store.authors.authors;
    } else if (isGenres) {
      return store.genres.genres;
    } else if (isTracks) {
      return store.adminTracks.tracks;
    } else if (isUsers) {
      return store.users_playlists.users_playlists;
    }
  };
  const data = useSelector((s) => getData(s));
  console.log(data);

  useEffect(() => {
    if (isGenres) {
      dispatch(getAllGenres());
    } else if (isAuthors) {
      dispatch(getAllAuthors());
    } else if (isTracks) {
      dispatch(getAllTracks());
      dispatch(getAllAuthors());
      dispatch(getAllGenres());
    } else if (isUsers) {
      dispatch(getUsersPlaylists());
    }
    return () => {
      setSelected([]);
      setOpenConfirmModal(false);
      setOpenAddModal(false);
    };
  }, [isGenres, isUsers, isAuthors, isTracks, dispatch]);

  const handleShowAddModal = () => {
    setOpenAddModal(!openAddModal);
  };
  const handleShowConfirmModal = (items) => {
    setOpenConfirmModal(!openConfirmModal);
    setSelected(items);
  };

  const getButtonText = () => {
    return isGenres
      ? "Создать новый жанр"
      : isAuthors
      ? "Создать нового исполнителя"
      : isTracks
      ? "Создать новую песню"
      : "Создать новый альбом";
  };
  return (
    <div className="editpage">
      <Container>
        {!isUsers && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleShowAddModal}
          >
            {getButtonText()}
          </Button>
        )}
        {!isUsers && !isAlbums ? (
          <Table
            title={title}
            data={data}
            isGenres={isGenres}
            isAuthors={isAuthors}
            isTracks={isTracks}
            selected={selected}
            setSelected={setSelected}
            handleShowConfirmModal={handleShowConfirmModal}
          />
        ) : (
          <AdminTableWithSubComponents
            data={data}
            isAlbums={isAlbums}
            isUsers={isUsers}
          />
        )}
        {openAddModal && (
          <AdminAddModal
            isGenres={isGenres}
            isAuthors={isAuthors}
            isTracks={isTracks}
            openModal={openAddModal}
            handleShowModal={handleShowAddModal}
          />
        )}
        {openConfirmModal && (
          <AdminConfirmModal
            isGenres={isGenres}
            isUsers={isUsers}
            isAuthors={isAuthors}
            isTracks={isTracks}
            openModal={openConfirmModal}
            selected={selected}
            handleShowConfirmModal={handleShowConfirmModal}
          />
        )}
      </Container>
    </div>
  );
}

export default EditPage;
