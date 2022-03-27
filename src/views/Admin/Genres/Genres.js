import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getAllGenres } from "../../../store/actions/adminActions/genresActions";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import AdminAddModal from "../../../components/AdminAddModal/AdminAddModal";
import "./genres.css";

function Genres() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const genres = useSelector((s) => s.genres.genres);
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="genres">
      <Container>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleShowModal}
        >
          Добавить новый жанр
        </Button>
        <Table
          title={"Жанры"}
          data={genres}
          isGenres={true}
          isPlayLists={false}
          isAuthors={false}
          isTracks={false}
        />
        {openModal && (
          <AdminAddModal
            openModal={openModal}
            handleShowModal={handleShowModal}
          />
        )}
      </Container>
    </div>
  );
}

export default Genres;
