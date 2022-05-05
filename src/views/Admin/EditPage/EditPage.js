import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Admin/Table/Table";
import { getAllAuthors } from "../../../store/actions/adminActions/authorActions";
import { getAllGenres } from "../../../store/actions/adminActions/genresActions";
import { getAllTracks } from "../../../store/actions/adminActions/trackActions";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import AdminAddModal from "../../../components/AdminAddModal/AdminAddModal";
import "./editPage.css";
import AdminConfirmModal from "../../../components/Modals/Admin/AdminConfirmModal/AdminConfirmModal";
import AdminTableWithSubComponents from "../../../components/AdminTableWithSubComponents/AdminTableWithSubComponents";
import { getUsersPlaylists } from "../../../store/actions/adminActions/usersPlaylistsActions";
import { getAllAlbums } from "../../../store/actions/adminActions/albumActions";

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
    } else if (isAlbums) {
      return store.albums.albums;
    }
  };
  const data = useSelector((s) => getData(s));

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
    } else if (isAlbums) {
      dispatch(getAllAlbums());
      dispatch(getAllAuthors());
      dispatch(getAllTracks());
    }
    return () => {
      setSelected([]);
      setOpenConfirmModal(false);
      setOpenAddModal(false);
    };
  }, [isGenres, isUsers, isAuthors, isTracks, isAlbums, dispatch]);

  const handleShowAddModal = () => {
    setOpenAddModal(!openAddModal);
  };
  const handleShowConfirmModal = (items) => {
    setOpenConfirmModal(!openConfirmModal);
    setSelected(items);
  };

  const getButtonText = () => {
    if (isAuthors) {
      return "Создать нового исполнителя";
    } else if (isTracks) {
      return "Создать новый трек";
    } else if (isAlbums) {
      return "Создать новый альбом";
    } else if (isGenres) {
      return "Создать новый жанр";
    }
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
            isAlbums={isAlbums}
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
