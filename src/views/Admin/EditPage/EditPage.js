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

function EditPage({ title, isGenres, isPlayLists, isAuthors, isTracks }) {
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
    }
    return () => {
      setSelected([]);
      setOpenConfirmModal(false);
      setOpenAddModal(false);
    };
  }, [isGenres, isPlayLists, isAuthors, isTracks, dispatch]);

  const handleShowAddModal = () => {
    setOpenAddModal(!openAddModal);
  };
  const handleShowConfirmModal = (items) => {
    setOpenConfirmModal(!openConfirmModal);
    setSelected(items);
  };

  const getButtonText = () => {
    return isGenres
      ? "Добавить новый жанр"
      : isAuthors
      ? "Добавить нового исполнителя"
      : isTracks
      ? "Добавить новую песню"
      : "Соси хуй";
  };
  return (
    <div className="editpage">
      <Container>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleShowAddModal}
        >
          {getButtonText()}
        </Button>
        <Table
          title={title}
          data={data}
          isGenres={isGenres}
          isPlayLists={isPlayLists}
          isAuthors={isAuthors}
          isTracks={isTracks}
          selected={selected}
          setSelected={setSelected}
          handleShowConfirmModal={handleShowConfirmModal}
        />
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
            isPlayLists={isPlayLists}
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
